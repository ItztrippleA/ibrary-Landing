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
        Students, families, teachers, and caregivers. If you want a note when iBrary launches, say so here or use Get Launch Updates on the home page.
      </p>
      <p>
        Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. The form opens that message in your mail app. This page does not keep a copy.
      </p>
      <ContactForm />
    </article>
  );
}
