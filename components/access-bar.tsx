'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  applyPrefs,
  defaultPrefs,
  readPrefs,
  savePrefs,
  textLabels,
  type AccessPrefs,
} from '@/lib/access-prefs';
import { stopReading } from '@/lib/read-page';
import { useReading } from '@/components/page-reader';

export function AccessBar() {
  const pathname = usePathname();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<AccessPrefs>(defaultPrefs);
  const prefsRef = useRef(prefs);
  const [note, setNote] = useState('');
  const { reading, supported, status, toggle } = useReading();
  prefsRef.current = prefs;

  useEffect(() => {
    const stored = readPrefs();
    setPrefs(stored);
    applyPrefs(stored);
  }, []);

  const pathRef = useRef(pathname);

  useEffect(() => {
    if (pathRef.current === pathname) return;
    pathRef.current = pathname;
    stopReading('Reading stopped.');
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const root = panelRef.current;
    const nodes = [document.querySelector('.skip-links'), document.querySelector('.nav-links'), document.querySelector('.nav-toggle'), document.querySelector('main'), document.querySelector('footer'), document.querySelector('.voice-panel'), document.querySelector('.voice-mic'), document.querySelector('.page-reader')];
    nodes.forEach((node) => node?.setAttribute('inert', ''));
    const focusable = root?.querySelector<HTMLElement>('button, a');
    focusable?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        launcherRef.current?.focus();
      }
      if (event.key !== 'Tab' || !root) return;
      const items = [...root.querySelectorAll<HTMLElement>('button, a')].filter((item) => !item.hasAttribute('disabled'));
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      nodes.forEach((node) => node?.removeAttribute('inert'));
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function update(change: (current: AccessPrefs) => AccessPrefs, message: string) {
    const next = change(prefsRef.current);
    prefsRef.current = next;
    setPrefs(next);
    savePrefs(next);
    setNote(message);
  }

  function setText(text: AccessPrefs['text']) {
    update((current) => ({ ...current, text }), `Text size is ${textLabels[text].toLowerCase()}.`);
  }

  return (
    <div className="access-dock" data-access-bar>
      <button
        ref={launcherRef}
        type="button"
        id="access-launcher"
        className="access-launcher"
        aria-expanded={open}
        aria-controls="access-panel"
        aria-label="Accessibility"
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="4.5" r="2" fill="currentColor" />
          <path
            fill="currentColor"
            d="M4.2 9.2a1 1 0 0 1 1-1h13.6a1 1 0 1 1 0 2h-5.05l1.55 7.6a1 1 0 0 1-1.96.4L12 13.7l-1.34 4.5a1 1 0 0 1-1.96-.4l1.55-7.6H5.2a1 1 0 0 1-1-1Z"
          />
        </svg>
        <span className="access-hint" aria-hidden="true">Accessibility</span>
      </button>
      {open ? (
        <div
          ref={panelRef}
          id="access-panel"
          className="access-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <div className="access-panel-head">
            <h2 id={titleId}>Accessibility</h2>
            <button type="button" className="access-close" onClick={() => { setOpen(false); launcherRef.current?.focus(); }}>
              Close
            </button>
          </div>
          <p>Choices stay in this browser. They do not change the class or the lesson.</p>
          <div className="access-row">
            <span id="access-text-label">Text size</span>
            <div className="access-step" role="group" aria-labelledby="access-text-label">
              <button type="button" onClick={() => setText((Math.max(0, prefsRef.current.text - 1)) as AccessPrefs['text'])} disabled={prefs.text === 0}>
                Smaller
              </button>
              <span>{textLabels[prefs.text]}</span>
              <button type="button" onClick={() => setText((Math.min(3, prefsRef.current.text + 1)) as AccessPrefs['text'])} disabled={prefs.text === 3}>
                Larger
              </button>
            </div>
          </div>
          <Toggle
            pressed={prefs.contrast}
            onClick={() => update((current) => ({ ...current, contrast: !current.contrast }), prefsRef.current.contrast ? 'High contrast is off.' : 'High contrast is on.')}
          >
            High contrast
          </Toggle>
          <Toggle
            pressed={prefs.readable}
            onClick={() => update((current) => ({ ...current, readable: !current.readable }), prefsRef.current.readable ? 'Easier reading is off.' : 'Easier reading is on.')}
          >
            Easier reading
          </Toggle>
          <Toggle
            pressed={prefs.links}
            onClick={() => update((current) => ({ ...current, links: !current.links }), prefsRef.current.links ? 'Link highlighting is off.' : 'Links are highlighted.')}
          >
            Highlight links
          </Toggle>
          <Toggle
            pressed={prefs.spacing}
            onClick={() => update((current) => ({ ...current, spacing: !current.spacing }), prefsRef.current.spacing ? 'Extra spacing is off.' : 'Extra spacing is on.')}
          >
            More space
          </Toggle>
          <Toggle
            pressed={prefs.motion}
            onClick={() => update((current) => ({ ...current, motion: !current.motion }), prefsRef.current.motion ? 'Motion is on.' : 'Motion is stopped.')}
          >
            Stop motion
          </Toggle>
          <button type="button" className="button access-read" onClick={toggle} disabled={!supported} aria-pressed={reading}>
            {reading ? 'Stop reading' : 'Read this page'}
          </button>
          <button
            type="button"
            className="button-quiet access-reset"
            onClick={() => update(() => defaultPrefs, 'Accessibility choices are reset.')}
          >
            Reset
          </button>
          <p className="sr-only" aria-live="polite">{note} {status}</p>
        </div>
      ) : null}
    </div>
  );
}

function Toggle({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button type="button" className="access-toggle" aria-pressed={pressed} onClick={onClick}>
      <span>{children}</span>
      <span>{pressed ? 'On' : 'Off'}</span>
    </button>
  );
}
