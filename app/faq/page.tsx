import type { Metadata } from 'next';
import Link from 'next/link';
import { appOpensLabel, contactEmail } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Questions',
  description: 'Common questions about iBrary, classes, pricing, and the mobile app.',
};

const questions = [
  {
    q: 'Who is iBrary for?',
    a: 'Every student in Nigerian secondary school, from JSS1 to SS3, and the teachers who share courses with them. Blind and low-vision students use the same class. Access tools are there when someone needs them. No diagnosis is required.',
  },
  {
    q: 'Which classes and terms?',
    a: 'JSS1, JSS2, JSS3, SS1, SS2, and SS3. Each class is split into terms 1, 2, and 3.',
  },
  {
    q: 'Is the phone app available?',
    a: `Not yet. The app is set to open on ${appOpensLabel}, on Google Play and the App Store. Join the waitlist on the home page and we will send the link. This website does not keep a copy of that note.`,
  },
  {
    q: 'Does it replace a teacher or a school?',
    a: 'No. Teachers are part of iBrary. They upload a course, and the school reviews it before students see it. The teacher in the room is still the teacher.',
  },
  {
    q: 'Are the quizzes from WAEC?',
    a: 'Some questions are tied to a WAEC year and kept with that year. Others are written for the topic. A quiz is grouped by topic, so you can practise one idea at a time.',
  },
  {
    q: 'What does it cost?',
    a: 'The prepared plans are NGN 2,500 a month, NGN 6,000 for six months, and NGN 24,000 for a year. A referral takes 10% off for the person invited. Payment is in naira through Paystack.',
  },
  {
    q: 'Do I need a diagnosis to join?',
    a: 'No. You set a class and use the lessons. We do not ask for a medical letter.',
  },
  {
    q: 'How do I reach you?',
    a: `Use the contact page or email ${contactEmail}. The form opens your own mail app. We do not store the message on this website.`,
  },
];

export default function FaqPage() {
  return (
    <article className="article">
      <p className="eyebrow">Questions</p>
      <h1>Short answers.</h1>
      <p className="lede">If yours is not here, <Link href="/contact">send it</Link>.</p>
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
