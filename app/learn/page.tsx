import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';
import { Reveal } from '@/components/motion';

export const metadata: Metadata = {
  title: 'Learn',
  description: 'How iBrary organises lessons, quizzes, progress, and practice for JSS1 to SS3.',
};

const blocks = [
  {
    title: 'Catalogue',
    body: 'Each subject belongs to a class and a term, with a length and the books that go with it. You can keep a subject, and you can leave a short review once you have used it.',
  },
  {
    title: 'Quizzes',
    body: 'Questions sit under a topic, not in one endless paper. Four choices, one answer, and the option to leave a question ungraded when it is only for settling in. A result is saved with the attempt.',
  },
  {
    title: 'Progress',
    body: 'Every subject keeps a percent. Activity on the account records what you opened. You can leave and come back without asking someone to find your page.',
  },
  {
    title: 'Games and points',
    body: 'Points, badges, and a leaderboard reward steady practice. They sit beside the lesson. They do not replace it.',
  },
  {
    title: 'Notices',
    body: 'Results, billing, referrals, and general notes can arrive on the account, and by email when you allow it. You choose which of those emails you want.',
  },
  {
    title: 'Plans and purse',
    body: 'Monthly, six-month, and yearly plans are priced in naira and paid through Paystack. A purse can hold an amount toward a plan. A referral code from someone already on iBrary takes 10% off.',
  },
];

export default function LearnPage() {
  return (
    <>
      <PageIntro
        eyebrow="Learn"
        title="The same syllabus, for the whole class."
        lede="Open your class, pick the term, and study the topic. Teachers can add a course after the school checks it. You can read the lesson, hear it, or follow a sign."
        image="/images/study-tablet.jpg"
        alt="Hands holding a tablet with a high-contrast cream and navy layout, beside a tactile board."
      />
      <section className="section">
        <div className="wrap levels">
          {blocks.map((block) => (
            <Reveal key={block.title}>
              <article className="panel">
                <h2>{block.title}</h2>
                <p>{block.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="wrap inline-actions">
          <Link className="button" href="/contact">
            Ask for the app note
          </Link>
          <Link className="button-quiet" href="/accessibility">
            Accessibility
          </Link>
        </div>
      </section>
    </>
  );
}
