import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { learningWays } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Features',
  description: 'How iBrary is being designed so learners can read, listen, and explore lessons in ways that suit them.',
};

export default function FeaturesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Features"
        title="Learn in ways that work for you."
        lede="Read, listen and explore lessons in ways that better suit your needs. iBrary is being designed with accessibility and flexibility at its core, including support for learners who use assistive technology or benefit from alternative ways of engaging with content."
        image="/images/practice.jpg"
        alt="Two students in white shirts sit at a desk with open notebooks. One speaks and gestures. The other listens, with headphones around his neck."
      />
      <section className="section" aria-label="Feature cards" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="levels">
            {learningWays.map((item) => (
              <article className="panel" key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
