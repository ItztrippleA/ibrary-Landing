export type ReadState = {
  reading: boolean;
  status: string;
  supported: boolean;
};

let reading = false;
let status = 'Page reader is off.';
let runId = 0;
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

function speakAt(parts: string[], index: number, id: number) {
  if (id !== runId) return;
  if (index >= parts.length) {
    reading = false;
    status = 'The page has been read.';
    emit();
    return;
  }
  const utterance = new SpeechSynthesisUtterance(parts[index]);
  utterance.lang = 'en-GB';
  utterance.rate = 1;
  utterance.onend = () => speakAt(parts, index + 1, id);
  utterance.onerror = (event) => {
    if (id !== runId) return;
    if (event.error === 'interrupted' || event.error === 'canceled') return;
    reading = false;
    status = 'The page could not be read aloud.';
    emit();
  };
  window.speechSynthesis.speak(utterance);
}

export function stopReading(nextStatus = 'Reading stopped.') {
  runId += 1;
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
  const id = ++runId;
  window.speechSynthesis.cancel();
  reading = true;
  status = 'Reading this page.';
  emit();
  window.setTimeout(() => speakAt(chunks(text), 0, id), 60);
}

export function toggleReading() {
  if (reading) stopReading();
  else startReading();
}
