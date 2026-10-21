'use client';

import { useEffect, useRef, useState } from 'react';
import { AccessBar } from '@/components/access-bar';

type SpeechRecEvent = {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
};

type SpeechRec = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechRecEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function recognitionCtor(): (new () => SpeechRec) | null {
  if (typeof window === 'undefined') return null;
  const host = window as Window & {
    SpeechRecognition?: new () => SpeechRec;
    webkitSpeechRecognition?: new () => SpeechRec;
  };
  return host.SpeechRecognition ?? host.webkitSpeechRecognition ?? null;
}

export function VoiceAsk() {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const recRef = useRef<SpeechRec | null>(null);

  useEffect(() => {
    return () => {
      recRef.current?.stop();
    };
  }, []);

  function start() {
    const Ctor = recognitionCtor();
    if (!Ctor) {
      setSupported(false);
      setOpen(true);
      setError('This browser cannot turn speech into text. Chrome or Edge can.');
      return;
    }
    recRef.current?.stop();
    const rec = new Ctor();
    rec.lang = 'en-NG';
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (event) => {
      let text = '';
      for (let i = 0; i < event.results.length; i += 1) {
        text += event.results[i][0]?.transcript ?? '';
      }
      setTranscript(text.trim());
    };
    rec.onerror = (event) => {
      setListening(false);
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError('The microphone is blocked. Allow it in the browser, then try again.');
      } else if (event.error === 'no-speech') {
        setError('No speech was heard. Try again.');
      } else if (event.error !== 'aborted') {
        setError('Speech could not be captured.');
      }
    };
    rec.onend = () => setListening(false);
    recRef.current = rec;
    setError('');
    setTranscript('');
    setSupported(true);
    setOpen(true);
    setListening(true);
    try {
      rec.start();
    } catch {
      setListening(false);
      setError('Speech could not be started. Try again.');
    }
  }

  function stop() {
    recRef.current?.stop();
    setListening(false);
  }

  function close() {
    stop();
    setOpen(false);
  }

  return (
    <div className="voice-dock" role="region" aria-label="Accessibility and speech">
      {open ? (
        <div className="voice-panel" role="region" aria-labelledby="voice-title">
          <div className="voice-panel-head">
            <p id="voice-title">{listening ? 'Listening' : 'Speak to iBrary'}</p>
            <button type="button" className="voice-close" onClick={close} aria-label="Close speech">
              Close
            </button>
          </div>
          <p className="voice-transcript" aria-live="polite">
            {transcript || (listening ? 'Say what you want to do.' : 'Nothing was captured.')}
          </p>
          {error ? <p className="voice-error">{error}</p> : null}
          {supported && !listening && transcript ? (
            <p className="voice-note">The assistant is not connected yet. These words stay in this browser.</p>
          ) : null}
          {listening ? (
            <button type="button" className="button voice-stop" onClick={stop}>
              Stop
            </button>
          ) : (
            <button type="button" className="button voice-stop" onClick={start}>
              Speak again
            </button>
          )}
        </div>
      ) : null}
      <AccessBar />
      <button
        type="button"
        id="speak-button"
        className={listening ? 'voice-mic is-listening' : 'voice-mic'}
        aria-pressed={listening}
        aria-label={listening ? 'Stop listening' : 'Speak to iBrary'}
        onClick={listening ? stop : start}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Zm5-3a1 1 0 1 0-2 0 3 3 0 0 1-6 0 1 1 0 1 0-2 0 5 5 0 0 0 4 4.9V18H9a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-2v-2.1A5 5 0 0 0 17 11Z"
          />
        </svg>
      </button>
    </div>
  );
}
