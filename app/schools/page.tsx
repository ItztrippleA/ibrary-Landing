import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { contactEmail } from '@/lib/site';

export const metadata: Metadata = {
  title: 'For educators',
  description: 'How educators can share learning resources with iBrary, subject to review.',
};

const educatorMailto = `mailto:${contactEmail}?subject=${encodeURIComponent('Join the iBrary educator community')}&body=${encodeURIComponent('Please add me to the iBrary educator community.\n\nName:\nWhat I teach:\n')}`;

export default function SchoolsPage() {
  return (
    <>
      <PageIntro
        eyebrow="For educators"
        title="A place for educators to share their knowledge."
        lede="Have a better way of explaining a difficult topic? iBrary will create opportunities for educators to share useful learning resources with students beyond their own classrooms, subject to review and approval."
        image="/images/classroom.jpg"
        alt="A headphone-wearing student reads at a desk in a sunlit classroom, with classmates and a teacher behind him."
      />
      <article className="article prose">
        <p>
          Great teaching should be able to reach learners beyond one classroom. iBrary is developing a way for educators to contribute helpful learning resources—such as audio and video explanations—for review and possible inclusion alongside relevant topics. Approved contributions may also create opportunities for educators to earn when learners engage with their content.
        </p>
        <div className="inline-actions">
          <a className="button" href={educatorMailto}>
            Join the Educator Community
          </a>
        </div>
        <p>This opens your mail app. This page does not keep a copy.</p>
      </article>
    </>
  );
}
