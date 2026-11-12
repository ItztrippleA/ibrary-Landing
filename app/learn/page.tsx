import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';
import { learningWays } from '@/lib/site';

export const metadata: Metadata = {
  title: 'For students',
  description: 'How iBrary is being designed to help Nigerian students understand curriculum-aligned topics.',
};

export default function LearnPage() {
  return (
    <>
      <PageIntro
        eyebrow="For students"
        title="Understand more. Learn your way."
        lede="Ever met a topic that just would not make sense, no matter how many times you read it? iBrary is designed to break complex ideas into clear, relatable explanations and help you learn at your own pace."
        image="/images/study-tablet.jpg"
        alt="Hands holding a tablet with a high-contrast cream and navy layout, beside a tactile board."
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <h2>Learn in ways that work for you.</h2>
            <p>
              Read, listen to, and explore lessons in ways that better suit your needs. iBrary is being designed with accessibility and flexibility at its core, including support for learners who use assistive technology or benefit from alternative ways of engaging with content.
            </p>
          </div>
          <div className="levels">
            {learningWays.map((item) => (
              <article className="panel" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="inline-actions">
            <Link className="button" href="/#waitlist">
              Get Launch Updates
            </Link>
            <Link className="button-quiet" href="/accessibility">
              Accessibility
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
