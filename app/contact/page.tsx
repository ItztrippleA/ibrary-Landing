import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { contactEmail } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Write to iBrary about the app, a school, or access.',
};

export default function ContactPage() {
  return (
    <article className="article">
      <p className="eyebrow">Contact</p>
      <h1>Write to us.</h1>
      <p className="lede">
        Students, families, and schools. Tell us your class or the year group you have in mind. If you want a note when the phone app is ready, say so.
      </p>
      <p>
        Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. The form opens that message in your mail app. This page does not keep a copy.
      </p>
      <ContactForm />
    </article>
  );
}
