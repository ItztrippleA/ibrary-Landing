export type ReadState = {
  reading: boolean;
  status: string;
  supported: boolean;
};

let reading = false;
let status = 'Page reader is off.';
let runId = 0;
let keepAlive = 0;
const listeners = new Set<(state: ReadState) => void>();

function canSpeak() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function snapshot(): ReadState {
  return { reading, status, supported: canSpeak() };
}

function emit() {
  const state = snapshot();
  listeners.forEach((listener) => listener(state));
}

export function subscribeReading(listener: (state: ReadState) => void) {
  listeners.add(listener);
  listener(snapshot());
  return () => {
    listeners.delete(listener);
  };
}

function collectPageText() {
  const root = document.getElementById('content');
  if (!root) return '';
  const parts: string[] = [];
  root.querySelectorAll('h1, h2, h3, h4, p, li').forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (node.closest('[data-page-reader], .audio-log')) return;
    if (node.parentElement?.closest('li, h1, h2, h3, h4, p')) return;
    const text = node.innerText.replace(/\s+/g, ' ').trim();
    if (text) parts.push(text);
  });
  return parts.join(' ');
}

function chunks(text: string) {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  const out: string[] = [];
  let buf = '';
  for (const sentence of sentences) {
    const next = buf ? `${buf} ${sentence}` : sentence;
    if (next.length > 240 && buf) {
      out.push(buf);
      buf = sentence;
    } else {
      buf = next;
    }
  }
  if (buf) out.push(buf);
  return out;
}

function clearKeepAlive() {
  window.clearInterval(keepAlive);
  keepAlive = 0;
}

function holdSpeech(id: number) {
  clearKeepAlive();
  keepAlive = window.setInterval(() => {
    if (id !== runId) {
      clearKeepAlive();
      return;
    }
    const synth = window.speechSynthesis;
    if (!synth.speaking && !synth.pending) {
      clearKeepAlive();
      return;
    }
    synth.resume();
  }, 8000);
}

function applyVoice(utterance: SpeechSynthesisUtterance) {
  const voices = window.speechSynthesis.getVoices();
  const voice =
    voices.find((item) => item.lang === 'en-GB') ||
    voices.find((item) => item.lang.toLowerCase().startsWith('en'));
  if (!voice) return;
  utterance.voice = voice;
  utterance.lang = voice.lang;
}

function failureStatus(error: string) {
  if (error === 'not-allowed') return 'The phone blocked reading aloud. Allow sound, then try again.';
  if (error === 'language-unavailable' || error === 'voice-unavailable') return 'This phone has no English voice for reading.';
  return 'The page could not be read aloud.';
}

export function stopReading(nextStatus = 'Reading stopped.') {
  runId += 1;
  clearKeepAlive();
  reading = false;
  status = nextStatus;
  window.speechSynthesis?.cancel();
  emit();
}

export function startReading() {
  if (!canSpeak()) {
    reading = false;
    status = 'This browser cannot read the page aloud.';
    emit();
    return;
  }
  const text = collectPageText();
  if (!text) {
    reading = false;
    status = 'There is no page text to read.';
    emit();
    return;
  }
  const synth = window.speechSynthesis;
  const parts = chunks(text);
  const id = ++runId;
  synth.getVoices();
  if (synth.paused) synth.resume();
  if (synth.speaking || synth.pending) synth.cancel();

  parts.forEach((part, index) => {
    const utterance = new SpeechSynthesisUtterance(part);
    utterance.rate = 1;
    applyVoice(utterance);
    utterance.onend = () => {
      if (id !== runId || index !== parts.length - 1) return;
      clearKeepAlive();
      reading = false;
      status = 'The page has been read.';
      emit();
    };
    utterance.onerror = (event) => {
      if (id !== runId) return;
      if (event.error === 'interrupted' || event.error === 'canceled') return;
      clearKeepAlive();
      reading = false;
      status = failureStatus(event.error);
      emit();
    };
    synth.speak(utterance);
  });
  synth.resume();
  reading = true;
  status = 'Reading this page.';
  emit();
  holdSpeech(id);
}

export function toggleReading() {
  if (reading) stopReading();
  else startReading();
}
