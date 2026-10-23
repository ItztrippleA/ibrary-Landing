import type { Metadata } from 'next';
import Link from 'next/link';
import { contactEmail, questions } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Questions',
  description: 'Common questions about iBrary, who it is for, and when it will launch.',
};

export default function FaqPage() {
  return (
    <article className="article">
      <p className="eyebrow">Questions</p>
      <h1>Frequently asked questions</h1>
      <p className="lede">
        If yours is not here, <Link href="/contact">send it</Link> or email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </p>
      <div className="prose">
        {questions.map((item) => (
          <details key={item.q} className="faq">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </article>
  );
}
