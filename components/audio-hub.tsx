'use client';

import { useEffect, useState } from 'react';

const script =
  'iBrary keeps the whole class on one term. Open your year, follow the lesson, and answer in your own way.';

const readyLines = [
  'Voice is ready when you press play.',
  'Sound does not start on its own.',
  'The same lesson can be read or heard.',
];

export function AudioHub() {
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);
  const [lines, setLines] = useState(readyLines);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  function stop() {
    window.speechSynthesis?.cancel();
    setPlaying(false);
    setLines(readyLines);
  }

  function play() {
    if (!supported) return;
    const synth = window.speechSynthesis;
    if (synth.paused) synth.resume();
    if (synth.speaking || synth.pending) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(script);
    const voice =
      synth.getVoices().find((item) => item.lang === 'en-GB') ||
      synth.getVoices().find((item) => item.lang.toLowerCase().startsWith('en'));
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }
    utterance.rate = 1;
    utterance.onend = () => {
      setPlaying(false);
      setLines(['The demo has finished.', 'Press play to hear it again.', 'Nothing was stored.']);
    };
    utterance.onerror = () => {
      setPlaying(false);
      setLines(readyLines);
    };
    setLines(['Speaking the demo.', 'You can stop it at any time.', 'This stays in your browser.']);
    setPlaying(true);
    synth.speak(utterance);
    synth.resume();
  }

  return (
    <section className="section audio-hub" aria-labelledby="audio-title">
      <div className="wrap audio-grid">
        <div>
          <p className="eyebrow">Voice</p>
          <h2 id="audio-title">Hear a lesson the way a student would.</h2>
          <p>
            Press play and the browser reads one short line. It is the same read-aloud a class can turn on. Nothing is sent anywhere.
          </p>
          <button type="button" className="button" onClick={playing ? stop : play} disabled={!supported}>
            {playing ? 'Stop the demo' : 'Play voice demo'}
          </button>
          {!supported ? <p className="voice-note">This browser cannot speak the demo. The line is written below.</p> : null}
        </div>
        <div className="audio-log" aria-live="polite">
          <p className="audio-script">{script}</p>
          {lines.map((line) => (
            <p key={line}>{`> ${line}`}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
