'use client';

import { FormEvent, useState } from 'react';
import { contactEmail } from '@/lib/site';

export function LaunchBand() {
  const [note, setNote] = useState('');

  function join(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email') ?? '').trim();
    const body = [`Email: ${email}`, '', 'Please tell me when iBrary launches.'].join('\n');
    const href = `mailto:${contactEmail}?subject=${encodeURIComponent('iBrary launch updates')}&body=${encodeURIComponent(body)}`;
    setNote('Your mail app should open with the note. If it does not, write to hello@ibrary.app.');
    window.location.href = href;
  }

  return (
    <section className="launch" id="waitlist" aria-labelledby="launch-title">
      <div className="wrap launch-grid">
        <div>
          <h2 id="launch-title">A new way to learn is on the way.</h2>
          <p className="launch-lede">
            iBrary is being built to make learning more understandable, inclusive and personal for Nigerian students. Sign up to hear when it is ready and be among the first to explore it.
          </p>
        </div>
        <form className="launch-card waitlist" onSubmit={join}>
          <label htmlFor="waitlist-email">Email for launch updates</label>
          <div className="waitlist-row">
            <input
              id="waitlist-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@email.com"
            />
            <button className="button" type="submit">
              Notify Me at Launch
            </button>
          </div>
          <p className="hero-note">This opens your mail app. This page does not keep a copy.</p>
          {note ? (
            <p className="form-note" role="status">
              {note}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
