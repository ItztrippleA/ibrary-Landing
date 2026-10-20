import type { Metadata } from 'next';
import Link from 'next/link';
import { contactEmail } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How iBrary handles personal information.',
};

export default function PrivacyPage() {
  return (
    <article className="article prose">
      <p className="eyebrow">Privacy</p>
      <h1>Privacy policy</h1>
      <p>Last updated 10 October 2026.</p>
      <p>
        This policy explains what iBrary collects, why, and the choices you have. It is written to match the Nigeria Data Protection Act 2023. If you are under 18, please read it with a parent or guardian.
      </p>

      <h2>Who we are</h2>
      <p>
        iBrary is the learning service described on this website. For privacy questions, email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </p>

      <h2>What we collect</h2>
      <p>When you create an account we ask for your name, email, class, and a password, or we receive a Google sign-in identifier if you choose that. We store your class path when you set one.</p>
      <p>As you study we store subject progress, quiz attempts and scores, activity titles, favourites, reviews you write, points, badges, notices, and referral codes you use or share.</p>
      <p>If you pay, Paystack processes the card or transfer. We store the plan, the amount, the status, and a payment reference. We do not store your full card number.</p>
      <p>A purse balance and the reasons it changed are stored on your account.</p>
        <p>This marketing website does not store a theme choice, a copy of the contact form, or the app waitlist. Those forms open your mail app. Speech you give the microphone stays in this browser. It is not sent or stored until an assistant is connected.</p>

      <h2>Why we use it</h2>
      <p>
        To run your account, show the right class and term, mark quizzes, keep progress, send notices you have allowed, take payment, apply a referral, and keep the service secure. We do not sell personal information.
      </p>

      <h2>Who else sees it</h2>
      <p>
        Paystack sees the payment details needed to charge a plan. An email provider sends messages when email notices are on. Hosting that runs the service stores the data for us. A school does not get a student’s account unless that student or their guardian has agreed, or we have set up a written school arrangement that says so.
      </p>
      <p>We share information if the law requires it.</p>

      <h2>How long we keep it</h2>
      <p>
        We keep account and learning records while the account is open, and payment records for as long as tax and accounting rules need them. You can ask us to delete the account. We will remove what we are allowed to remove and tell you if something has to stay.
      </p>

      <h2>Your choices</h2>
      <p>
        You can turn email notices, assessment emails, and billing emails off on the account. In-app notices can be turned off too. You can ask for a copy of your information, a correction, or deletion, by writing to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. You can also complain to the Nigeria Data Protection Commission.
      </p>

      <h2>Children and students</h2>
      <p>
        Secondary students may be under 18. We collect class and learning records because that is the service, not for advertising. We do not ask for a medical diagnosis.
      </p>

      <h2>This website</h2>
      <p>
        Pages are served without advertising cookies and without a third-party analytics tag.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes, the date at the top changes with it. The <Link href="/terms">terms of use</Link> cover the rest of the service.
      </p>
    </article>
  );
}
