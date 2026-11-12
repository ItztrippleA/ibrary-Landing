'use client';

import { FormEvent, useState } from 'react';
import { contactEmail } from '@/lib/site';

const roles = ['Student', 'Parent or guardian', 'Teacher', 'School', 'Someone else'] as const;

export function ContactForm() {
  const [note, setNote] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const role = String(data.get('role') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const body = [`Name: ${name}`, `Email: ${email}`, `I am a: ${role}`, '', message].join('\n');
    const href = `mailto:${contactEmail}?subject=${encodeURIComponent('iBrary enquiry')}&body=${encodeURIComponent(body)}`;
    setNote(`Your mail app should open with this note ready to send. If it does not, write to ${contactEmail}.`);
    window.location.href = href;
  }

  return (
    <form className="form contact-form" onSubmit={submit}>
      <div className="contact-fields">
        <label>
          Name
          <input name="name" autoComplete="name" required placeholder="Your name" />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required placeholder="you@email.com" />
        </label>
      </div>
      <fieldset className="role-set">
        <legend>I am a</legend>
        <div className="role-picks">
          {roles.map((role) => (
            <label key={role} className="role-pick">
              <input type="radio" name="role" value={role} defaultChecked={role === 'Student'} required />
              <span>{role}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label>
        Message
        <textarea name="message" required placeholder="Class, school, or what you want from iBrary." />
      </label>
      <button className="button" type="submit">
        Write to iBrary
      </button>
      {note ? (
        <p className="form-note" role="status">
          {note}
        </p>
      ) : null}
    </form>
  );
}
