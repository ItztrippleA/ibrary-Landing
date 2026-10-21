'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { VoiceAsk } from '@/components/voice-ask';
import { primaryNav } from '@/lib/site';

export function SiteHeader() {
  const pathname = usePathname();
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);
  const keepPlace = useRef(true);
  const pathRef = useRef(pathname);

  useEffect(() => {
    if (pathRef.current === pathname) return;
    pathRef.current = pathname;
    if (open) {
      keepPlace.current = false;
      setOpen(false);
      return;
    }
    if (window.location.hash) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, open]);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 960px)');
    function onChange() {
      if (!query.matches) setOpen(false);
    }
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const body = document.body;
    keepPlace.current = true;
    scrollY.current = window.scrollY;
    root.classList.add('nav-open');
    body.style.position = 'fixed';
    body.style.top = `-${scrollY.current}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    const nodes = [document.querySelector('.skip-links'), document.querySelector('header'), document.querySelector('main'), document.querySelector('footer')];
    nodes.forEach((node) => node?.setAttribute('inert', ''));
    sheetRef.current?.querySelector<HTMLElement>('button, a')?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !sheetRef.current) return;
      const items = [...sheetRef.current.querySelectorAll<HTMLElement>('button, a')];
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
      root.classList.remove('nav-open');
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      nodes.forEach((node) => node?.removeAttribute('inert'));
      if (keepPlace.current) {
        window.scrollTo({ top: scrollY.current, left: 0, behavior: 'instant' });
      } else if (window.location.hash) {
        document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <div className="wrap header-bar">
          <p className="brand">
            <img className="brand-logo" src="/logo.png" alt="iBrary" />
          </p>
          <ul className="nav-links">
            <NavItems pathname={pathname} />
          </ul>
          <div className="header-tools">
            <VoiceAsk />
            <button
              ref={toggleRef}
              type="button"
              className={open ? 'nav-toggle open' : 'nav-toggle'}
              aria-expanded={open}
              aria-controls="site-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="nav-toggle-bars" />
            </button>
          </div>
        </div>
      </header>
      {open ? (
        <div
          ref={sheetRef}
          id="site-nav"
          className="nav-sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <div className="nav-sheet-bar">
            <p id={titleId}>Menu</p>
            <button type="button" className="nav-sheet-close" onClick={closeMenu}>
              Close
            </button>
          </div>
          <ul className="nav-sheet-links">
            <NavItems pathname={pathname} onSamePage={closeMenu} />
          </ul>
        </div>
      ) : null}
    </>
  );
}

function NavItems({ pathname, onSamePage }: { pathname: string; onSamePage?: () => void }) {
  function onClick(event: { currentTarget: HTMLAnchorElement }) {
    const next = new URL(event.currentTarget.href, window.location.origin);
    if (next.pathname === window.location.pathname) onSamePage?.();
  }

  return (
    <>
      {primaryNav.map((item) => (
        <li key={item.href}>
          <Link href={item.href} aria-current={pathname === item.href ? 'page' : undefined} onClick={onClick}>
            {item.label}
          </Link>
        </li>
      ))}
      <li>
        <Link href="/#waitlist" className="button" onClick={onClick}>
          Join
        </Link>
      </li>
    </>
  );
}
