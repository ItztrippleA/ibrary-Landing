import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';

export const metadata: Metadata = {
  title: 'About',
  description: 'Why iBrary exists for every student and teacher in Nigerian secondary schools.',
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title="School should not stop at the board."
        lede="iBrary is for every student from JSS1 to SS3, and for the teachers who teach them. The same term can be read, heard as a discussion, or practised at the pace the student is actually moving."
        image="/images/library-shelves.jpg"
        alt="A person with headphones follows a book by touch in a quiet library."
      />
      <article className="article prose">
        <h2>Who it is for</h2>
        <p>
          Every student in JSS1 to SS3, and every teacher who wants the class on one timetable. A parent who wants the same syllabus at home. A student who cannot rely on small print or the board uses the same topics, not a separate track.
        </p>
        <h2>What we hold to</h2>
        <p>
          Sight is one way to learn. It is not a requirement for finishing the year. We write and design for that directly: large type, strong contrast, and lessons that can be heard. We do not dress access up as a special track with easier work.
        </p>
        <p>
          We also do not replace a teacher, sell a list of students, or ask a learner to prove a diagnosis before they can open a subject.
        </p>
        <h2>What sits in the product</h2>
        <p>
          A catalogue of subjects and books by class and term, from JSS1 to SS3. Topics sit under a subject, and a topic can hold a smaller part, such as soaking garri under osmosis. Topic quizzes, including items tied to past WAEC years where we have them. Progress on each subject. Points, badges, and a leaderboard. Reviews. Notices. Plans in naira, a purse, and a referral that takes 10% off for the person invited.
        </p>
        <h2>Teachers</h2>
        <p>
          A teacher has their own place on an account. They can offer a course once. It stays pending until the school reviews it, so a class does not receive an unchecked file. iBrary does not take the teacher’s place in the room.
        </p>
        <h2>Ways into the same lesson</h2>
        <p>A school can switch these on. They do not create a separate, easier syllabus.</p>
        <ul>
          <li>Read aloud, at a rate the student sets.</li>
          <li>Sign phrases, with a gloss, a meaning, and a video when one exists.</li>
          <li>A sign avatar, when that video should be shown.</li>
          <li>Voice commands the school writes, such as “next lesson”.</li>
          <li>Bionic reading, which marks the start of each word.</li>
          <li>Dyslexia mode, with wider spacing and larger type for that student only.</li>
          <li>Gaze navigation, kept as a setting until the phone app can use the camera.</li>
          <li>Visual notices, still written as text so a screen reader can read them.</li>
        </ul>
        <h2>A discussion of the topic</h2>
        <p>
          Each topic or subtopic can be heard as a two-person conversation: a guide and a student. Before it starts, the listener can say what to stay on, for example how osmosis applies to soaking garri. Left blank, the discussion covers the topic. The same request is stored and played again, so it is not built twice.
        </p>
        <p>
          The hosts use an everyday picture instead of reading the page aloud. The script is written from the lesson. Recorded voices are added when a voice service is connected. Until then, the script can still be read on the page.
        </p>
        <h2>Practice that changes pace</h2>
        <p>
          Practice questions are marked foundation, core, or stretch. If the answers come easily, the next one is harder. If the student misses, the step comes down and a hint appears. The hint does not name the right option. A coach can ask one prompting question. It does not hand over the answer.
        </p>
        <p>
          The desk keeps a record for each student and topic: tries, time, confidence, and how much of the pool is done. A school can add questions to any of the three steps.
        </p>
        <h2>Where we are</h2>
        <p>
          The learning app opens on 12 January 2027. This website explains the product, the terms, and how to reach us until then. The school desk already holds access tools, topics, podcast discussions, and adaptive practice. If you are a student, a family, or a school, <Link href="/contact">write to us</Link>.
        </p>
      </article>
    </>
  );
}
