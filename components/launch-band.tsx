'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { appOpensAt, appOpensLabel, contactEmail } from '@/lib/site';

type Store = 'Google Play' | 'App Store';

const opensAt = new Date(appOpensAt).getTime();

function splitRemaining(now: number) {
  const diff = Math.max(0, opensAt - now);
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: diff <= 0,
  };
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const left = now === null ? null : splitRemaining(now);
  const units = [
    ['Days', left?.days],
    ['Hours', left?.hours],
    ['Minutes', left?.minutes],
    ['Seconds', left?.seconds],
  ] as const;

  const spoken = left
    ? left.done
      ? 'The opening time has passed. Join the waitlist for the store link.'
      : `${left.days} days, ${left.hours} hours, and ${left.minutes} minutes until the iBrary app opens on ${appOpensLabel}.`
    : `The iBrary app opens on ${appOpensLabel}.`;

  return (
    <div className="countdown">
      <p className="countdown-kicker">{left?.done ? 'The opening time has passed' : `Opens ${appOpensLabel}`}</p>
      <div className="countdown-grid" aria-hidden="true">
        {units.map(([label, value]) => (
          <div className="count-unit" key={label}>
            <span className="countdown-num">{value === undefined ? '––' : String(value).padStart(2, '0')}</span>
            <span className="countdown-label">{label}</span>
          </div>
        ))}
      </div>
      <p className="sr-only" role="status">
        {spoken}
      </p>
    </div>
  );
}

export function LaunchBand() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [store, setStore] = useState<Store | ''>('');
  const [note, setNote] = useState('');

  function chooseStore(next: Store) {
    setStore(next);
    emailRef.current?.focus();
  }

  function join(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email') ?? '').trim();
    const body = [`Email: ${email}`, `Store: ${store || 'Either'}`, '', 'Please add me to the iBrary app waitlist.'].join('\n');
    const href = `mailto:${contactEmail}?subject=${encodeURIComponent('iBrary app waitlist')}&body=${encodeURIComponent(body)}`;
    setNote('Your mail app should open with the waitlist note. If it does not, write to hello@ibrary.app.');
    window.location.href = href;
  }

  return (
    <section className="launch" aria-labelledby="launch-title">
      <div className="wrap launch-grid">
        <div>
          <p className="eyebrow">Waitlist</p>
          <h2 id="launch-title">The app opens soon.</h2>
          <p className="launch-lede">One date for Google Play and the App Store. The link arrives by email.</p>
          <Countdown />
        </div>
        <div className="launch-card">
          <div className="store-row">
            <button
              className="store"
              type="button"
              aria-pressed={store === 'Google Play'}
              onClick={() => chooseStore('Google Play')}
            >
              <span className="store-kicker">Get it on</span>
              <span className="store-name">Google Play</span>
              <span className="sr-only">Not open yet. Adds Google Play to the waitlist note.</span>
            </button>
            <button
              className="store"
              type="button"
              aria-pressed={store === 'App Store'}
              onClick={() => chooseStore('App Store')}
            >
              <span className="store-kicker">Download on the</span>
              <span className="store-name">App Store</span>
              <span className="sr-only">Not open yet. Adds the App Store to the waitlist note.</span>
            </button>
          </div>
          <form className="waitlist" id="waitlist" onSubmit={join}>
            <label htmlFor="waitlist-email">Email for the waitlist</label>
            <div className="waitlist-row">
              <input
                ref={emailRef}
                id="waitlist-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@email.com"
              />
              <button className="button" type="submit">
                Join the waitlist
              </button>
            </div>
            <p className="hero-note">
              {store
                ? `${store} is not open yet. The waitlist note will ask for that store.`
                : 'The stores open with the app. Join the waitlist and we will send the link. This page does not keep a copy.'}
            </p>
            {note ? (
              <p className="form-note" role="status">
                {note}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
