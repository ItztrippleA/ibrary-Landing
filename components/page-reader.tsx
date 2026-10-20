'use client';

import { useEffect, useState } from 'react';
import { startReading, stopReading, subscribeReading, toggleReading } from '@/lib/read-page';

export function PageReader() {
  const [reading, setReading] = useState(false);
  const [supported, setSupported] = useState(true);
  const [status, setStatus] = useState('Page reader is off.');

  useEffect(() => subscribeReading((state) => {
    setReading(state.reading);
    setSupported(state.supported);
    setStatus(state.status);
  }), []);

  useEffect(() => () => stopReading('Reading stopped.'), []);

  return (
    <div className="page-reader" data-page-reader>
      <button
        type="button"
        className={reading ? 'page-reader-button is-reading' : 'page-reader-button'}
        aria-pressed={reading}
        disabled={!supported}
        onClick={() => (reading ? stopReading() : startReading())}
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

export function useReading() {
  const [reading, setReading] = useState(false);
  const [supported, setSupported] = useState(true);
  const [status, setStatus] = useState('Page reader is off.');

  useEffect(() => subscribeReading((state) => {
    setReading(state.reading);
    setSupported(state.supported);
    setStatus(state.status);
  }), []);

  return { reading, supported, status, toggle: toggleReading };
}
