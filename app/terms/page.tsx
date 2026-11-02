import type { Metadata } from 'next';
import Link from 'next/link';
import { contactEmail } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms for using iBrary.',
};

export default function TermsPage() {
  return (
    <article className="article prose">
      <p className="eyebrow">Terms</p>
      <h1>Terms of use</h1>
      <p>Last updated 10 October 2026.</p>
      <p>
        These terms cover the iBrary learning service and this website. By creating an account or paying for a plan, you agree to them. If you are under 18, a parent or guardian should read them with you.
      </p>

      <h2>The service</h2>
      <p>
        iBrary is an inclusive learning platform being built to help Nigerian secondary-school students understand curriculum-aligned topics. Features described on the website arrive with the released product, not all at once on this site.
      </p>

      <h2>Accounts</h2>
      <p>
        You need an account for saved progress, quizzes, notices, and payments. Keep your sign-in to yourself. You can register with an email and password or with Google. You are responsible for activity on your account unless you tell us it is being misused.
      </p>

      <h2>Learning material</h2>
      <p>
        Subjects, books, and quizzes are for personal study and for school use we have agreed in writing. You may not copy the catalogue to resell it. Courses submitted by users stay pending until they are approved. We can reject a course, or remove one later, when it is inaccurate, unsafe, or not yours to share.
      </p>

      <h2>Plans, purse, and referrals</h2>
      <p>
        When paid plans are offered, the price will be shown before you pay. Prices are not confirmed on this website yet. A change to a future price does not shorten a period you have already paid for.
      </p>
      <p>
        A purse, if one is offered, holds credit on the account toward a plan. It is not a bank account and it is not transferable for cash unless we are required to refund you. Any referral offer will be described before it is used.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not break into another account, scrape the service, upload malware, harass another learner, or submit work you do not have the right to share. We may suspend an account that does this.
      </p>

      <h2>Schools</h2>
      <p>
        If a school pays for students or asks us to set up a year group, we will agree the classes and the contact in writing. A student account still belongs to that student.
      </p>

      <h2>Availability</h2>
      <p>
        We aim to keep the service up, and we will interrupt it for fixes. We do not promise that a lesson, quiz score, or leaderboard will be available without a break.
      </p>

      <h2>Liability</h2>
      <p>
        iBrary is a study aid. It is not a school, an examination body, or medical advice. Exam results depend on more than this product. To the extent the law allows, we are not liable for lost marks, lost profit, or indirect loss. Nothing here limits liability that Nigerian law does not allow us to limit.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. The date at the top will change. If a change affects a plan you have already paid for, we will say so by email or by a notice on the account.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. The <Link href="/privacy">privacy policy</Link> explains what we do with personal information.
      </p>
    </article>
  );
}
