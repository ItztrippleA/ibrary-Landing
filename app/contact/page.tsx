import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { PageIntro } from '@/components/page-intro';
import { Reveal } from '@/components/motion';
import { contactEmail } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Write to iBrary about the app, a school, or access.',
};

const paths = [
  {
    mark: '01',
    title: 'Students and families',
    body: 'Ask about lessons, launch updates, or how a caregiver can follow along.',
  },
  {
    mark: '02',
    title: 'Teachers and schools',
    body: 'Write if you want to share a classroom explanation, or if a school is exploring iBrary.',
  },
  {
    mark: '03',
    title: 'Access',
    body: 'Tell us what would make the lessons easier to read, hear, or follow.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Write to us."
        lede="Students, families, teachers, and caregivers. If you want a note when iBrary launches, say so here or use Get Launch Updates on the home page."
        image="/images/practice.jpg"
        alt="Two students sit at a wooden desk and talk, with open notebooks between them."
      />
      <section className="section contact-section" aria-labelledby="contact-title">
        <div className="wrap contact-layout">
          <Reveal>
            <div className="contact-aside">
              <h2 id="contact-title">A note is enough.</h2>
              <a className="contact-mail" href={`mailto:${contactEmail}`}>
                <span>Email</span>
                <strong>{contactEmail}</strong>
              </a>
              <ul className="contact-paths">
                {paths.map((path) => (
                  <li key={path.mark}>
                    <span>{path.mark}</span>
                    <div>
                      <h3>{path.title}</h3>
                      <p>{path.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="fine">The form opens your mail app. This page does not keep a copy.</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="contact-panel">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
