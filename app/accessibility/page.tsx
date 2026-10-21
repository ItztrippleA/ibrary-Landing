import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';

export const metadata: Metadata = {
  title: 'Accessibility',
  description: 'How iBrary keeps the same class open for blind and low-vision students.',
};

export default function AccessibilityPage() {
  return (
    <>
      <PageIntro
        eyebrow="Accessibility"
        title="Access is the product, not a setting at the bottom."
        lede="iBrary is for the whole class. These tools keep a blind or low-vision student on the same term as everyone else. This website should be readable, hearable, and usable without a mouse."
        image="/images/hero-listen.jpg"
        alt="A student wears headphones and follows an open book with a hand on the page."
      />
      <article className="article prose">
        <h2>On this website</h2>
        <p>
          Accessibility and Speak sit in the header of every page, next to the menu. From the top of the page a screen reader can jump straight to them: the first links are Skip to content, Accessibility, and Speak to iBrary. Hover the Accessibility button and the name Accessibility appears. It can make the type larger, turn on high contrast, switch to an easier reading face, highlight links, add space between lines, stop motion, or read the page aloud. Those choices stay in this browser. The name iBrary in the header is the site name, not a link. Home in the menu opens the first page. Pages also use headings and landmarks. Forms have visible labels. Buttons are named in words. You can zoom. Motion stops when your system asks for reduced motion, or when you turn it off here.
        </p>
        <h2>In the app, for blind students</h2>
        <p>These are the features a blind student uses. They do not depend on seeing the screen.</p>
        <ul>
          <li>Lessons can be read aloud, so a topic can be followed by ear.</li>
          <li>Screen readers can move through headings, buttons, and each quiz choice, because every one has a name.</li>
          <li>Answers are given in words. Colour is never the only sign of a correct choice.</li>
          <li>Scores, progress, badges, and notices are text, so a braille display can read them.</li>
          <li>The lesson works from a keyboard. A gesture is never the only way to continue.</li>
          <li>Audio does not play by itself, so it does not interrupt a screen reader.</li>
          <li>Class and term stay the same as the school timetable, from JSS1 to SS3.</li>
          <li>A student can turn on bionic reading, dyslexia spacing, visual notices, gaze navigation, voice commands, and a sign avatar. The school writes the phrases and the signs. The camera and the microphone are for the phone app, which is not out yet.</li>
        </ul>
        <p>
          The phone app is still being prepared. If you use a screen reader or a braille display and something on this site gets in the way, <Link href="/contact">tell us what you were trying to do</Link>.
        </p>
        <h2>What we will not do</h2>
        <p>
          We will not hide a control in a picture. We will not autoplay sound. We will not require a gesture that has no keyboard or switch equivalent. We will not treat a blind student as a visitor in someone else’s app.
        </p>
      </article>
    </>
  );
}
