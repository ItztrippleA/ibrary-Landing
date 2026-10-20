'use client';

import { FormEvent, useState } from 'react';
import { contactEmail } from '@/lib/site';

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
    setNote('Your mail app should open with this note ready to send. If it does not, write to us at the address above.');
    window.location.href = href;
  }

  return (
    <form className="form" onSubmit={submit}>
      <label>
        Name
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        I am a
        <select name="role" defaultValue="Student" required>
          <option>Student</option>
          <option>Parent or guardian</option>
          <option>Teacher</option>
          <option>School</option>
          <option>Someone else</option>
        </select>
      </label>
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
