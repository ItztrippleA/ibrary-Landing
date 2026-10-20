import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';
import { levels } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Schools',
  description: 'How schools and teachers use iBrary alongside the secondary timetable.',
};

export default function SchoolsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Schools"
        title="Keep the class together."
        lede="iBrary follows JSS1 to SS3 and terms 1 to 3. Students and teachers share one scheme of work, including anyone who learns by ear or by sign."
        image="/images/classroom.jpg"
        alt="A headphone-wearing student reads at a desk in a sunlit classroom, with classmates and a teacher behind him."
      />
      <article className="article prose">
        <h2>Alongside the timetable</h2>
        <p>
          A school does not have to rebuild the year. Subjects are already grouped by class and term. Topic quizzes can sit next to the week’s work, including practice drawn from past WAEC papers where we have the year.
        </p>
        <h2>What a student account holds</h2>
        <p>
          Class, progress, quiz attempts, points, notices, and a plan if the family or school is paying. A school admin can mark someone as a teacher and review a course they upload before students see it. There is not a separate teacher website yet. If you want iBrary for a department or a resource room, write and tell us the classes you have in mind.
        </p>
        <h2>Courses from your staff</h2>
        <p>
          A person can submit a course for a class and term. It stays pending until it is read and approved, with a note if it is sent back. That review is how the catalogue stays fit for students.
        </p>
        <h2>Classes we cover</h2>
      </article>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap levels">
          {levels.map(([name, detail]) => (
            <article className="level" key={name}>
              <h3>{name}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
        <div className="wrap inline-actions">
          <Link className="button" href="/contact">
            Talk about your school
          </Link>
        </div>
      </section>
    </>
  );
}
