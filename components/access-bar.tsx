'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  applyPrefs,
  clampZoom,
  defaultPrefs,
  readPrefs,
  savePrefs,
  zoomMax,
  zoomMin,
  zoomStep,
  type AccessPrefs,
} from '@/lib/access-prefs';
import { stopReading } from '@/lib/read-page';
import { useReading } from '@/components/page-reader';

export function AccessBar() {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const firstOptionRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
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
    setOpen(false);
    stopReading('Reading stopped.');
  }, [pathname]);

  useEffect(() => {
    if (open) {
      firstOptionRef.current?.focus();
      const contrast = prefsRef.current.contrast ? 'on' : 'off';
      setNote(
        `Accessibility options. Read this page. Zoom, page size ${prefsRef.current.zoom} percent. High contrast, ${contrast}.`,
      );
    } else if (wasOpen.current && rootRef.current?.contains(document.activeElement)) {
      launcherRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function update(next: AccessPrefs, message: string) {
    const stored = { zoom: clampZoom(next.zoom), contrast: next.contrast };
    prefsRef.current = stored;
    setPrefs(stored);
    savePrefs(stored);
    setNote(message);
  }

  function zoomBy(direction: -1 | 1) {
    const zoom = clampZoom(prefsRef.current.zoom + direction * zoomStep);
    update({ ...prefsRef.current, zoom }, `Page size is ${zoom} percent.`);
  }

  const zoomLabel = `Zoom, page size ${prefs.zoom} percent`;

  return (
    <div className="access-dock" id="access-tools" ref={rootRef}>
      <button
        type="button"
        id="access-launcher"
        ref={launcherRef}
        className={open ? 'access-launcher is-open' : 'access-launcher'}
        aria-expanded={open}
        aria-controls="access-options"
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="4.4" r="2" fill="currentColor" />
          <path
            fill="currentColor"
            d="M4.2 9.1a1 1 0 0 1 1-1h13.6a1 1 0 1 1 0 2h-5.1v2.15l2.45 5.9a1 1 0 0 1-1.84.76L12 14.05l-2.31 4.86a1 1 0 1 1-1.84-.76l2.45-5.9V10.1H5.2a1 1 0 0 1-1-1Z"
          />
        </svg>
        <span className="access-hint" aria-hidden="true">Accessibility</span>
        <span className="sr-only">{open ? 'Close accessibility options' : 'Open accessibility options'}</span>
      </button>
      <div
        id="access-options"
        className={open ? 'access-slide is-open' : 'access-slide'}
        role="group"
        aria-label="Accessibility options"
        inert={open ? undefined : true}
      >
        <button
          type="button"
          id="read-this-page"
          ref={firstOptionRef}
          className={reading ? 'access-read-btn is-reading' : 'access-read-btn'}
          aria-pressed={reading}
          disabled={!supported}
          onClick={toggle}
        >
          <span className="access-play" aria-hidden="true">{reading ? '■' : '▶'}</span>
          {reading ? 'Stop reading' : 'Read this page'}
        </button>
        <div className="access-zoom" role="group" aria-label={zoomLabel}>
          <button type="button" onClick={() => zoomBy(-1)} disabled={prefs.zoom <= zoomMin} aria-label="Zoom out">
            −
          </button>
          <span aria-hidden="true">{prefs.zoom}%</span>
          <button type="button" onClick={() => zoomBy(1)} disabled={prefs.zoom >= zoomMax} aria-label="Zoom in">
            +
          </button>
        </div>
        <button
          type="button"
          className="access-contrast"
          aria-pressed={prefs.contrast}
          onClick={() =>
            update(
              { ...prefsRef.current, contrast: !prefsRef.current.contrast },
              prefsRef.current.contrast ? 'High contrast is off.' : 'High contrast is on.',
            )
          }
        >
          High contrast
        </button>
      </div>
      <p className="sr-only" aria-live="polite">{note}{status ? ` ${status}` : ''}</p>
    </div>
  );
}
