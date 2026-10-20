'use client';

import { useEffect, useRef, useState } from 'react';

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

export function PageReader() {
  const [reading, setReading] = useState(false);
  const [supported, setSupported] = useState(true);
  const [status, setStatus] = useState('Page reader is off.');
  const run = useRef(0);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
    return () => {
      run.current += 1;
      window.speechSynthesis?.cancel();
    };
  }, []);

  function speakAt(parts: string[], index: number, id: number) {
    if (run.current !== id) return;
    if (index >= parts.length) {
      setReading(false);
      setStatus('The page has been read.');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(parts[index]);
    utterance.lang = 'en-GB';
    utterance.rate = 1;
    utterance.onend = () => speakAt(parts, index + 1, id);
    utterance.onerror = (event) => {
      if (run.current !== id) return;
      if (event.error === 'interrupted' || event.error === 'canceled') return;
      setReading(false);
      setStatus('The page could not be read aloud.');
    };
    window.speechSynthesis.speak(utterance);
  }

  function stop() {
    run.current += 1;
    window.speechSynthesis?.cancel();
    setReading(false);
    setStatus('Reading stopped.');
  }

  function start() {
    if (!supported) return;
    const text = collectPageText();
    if (!text) {
      setStatus('There is no page text to read.');
      return;
    }
    const id = run.current + 1;
    run.current = id;
    window.speechSynthesis?.cancel();
    setReading(true);
    setStatus('Reading this page.');
    window.setTimeout(() => speakAt(chunks(text), 0, id), 60);
  }

  return (
    <div className="page-reader" data-page-reader>
      <button
        type="button"
        className={reading ? 'page-reader-button is-reading' : 'page-reader-button'}
        aria-pressed={reading}
        disabled={!supported}
        onClick={reading ? stop : start}
      >
        <span className="page-reader-waves" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        {reading ? 'Stop reading' : 'Read this page'}
      </button>
      <p className="sr-only" aria-live="polite">
        {status}
      </p>
      {!supported ? <p className="page-reader-note">This browser cannot read the page aloud.</p> : null}
    </div>
  );
}
