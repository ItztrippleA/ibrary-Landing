import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';

export const metadata: Metadata = {
  title: 'Accessibility',
  description: 'How iBrary is being built for screen-reader users and learners who need another way into a lesson.',
};

export default function AccessibilityPage() {
  return (
    <>
      <PageIntro
        eyebrow="Accessibility"
        title="Learning that is easier to reach."
        lede="iBrary is being built to make academic content easier to access through screen-reader-friendly and audio-supported learning experiences. Specific features will depend on the version released."
        image="/images/hero-listen.jpg"
        alt="A student wears headphones and follows an open book with a hand on the page."
      />
      <article className="article prose">
        <h2>On this website</h2>
        <p>
          The Accessibility icon sits in the header of every page, next to Speak. Select it and Read this page, zoom, and high contrast slide out. A screen reader says those names, and focus moves to Read this page so the rest can be reached in order. From the top of the page a screen reader can jump straight to that icon: the first links are Skip to content, Accessibility, and Speak to iBrary. Read this page plays the words on that page. Zoom uses minus and plus to change the page size by 10 percent at a time, from 80 percent to 200 percent. High contrast turns every page black and white, with yellow for links and buttons. Those choices stay in this browser. The header shows the iBrary logo as an image, with the description “iBrary logo”. It is not a link. Home in the menu opens the first page. Pages also use headings and landmarks. Forms have visible labels. Buttons are named in words. Motion stops when your system asks for reduced motion.
        </p>
        <h2>In the learning experience</h2>
        <p>
          Accessibility is a core part of iBrary’s design. The platform is being developed with screen-reader-friendly and audio-supported learning in mind. Read, listen to, and explore lessons in ways that better suit your needs. This includes support for learners who use assistive technology.
        </p>
        <ul>
          <li>A learning experience being built with screen-reader users and different access needs in mind.</li>
          <li>Sound on this website waits until you ask for it, so it does not talk over a screen reader.</li>
          <li>Buttons and form fields are named in words.</li>
          <li>You can zoom the page from 80 percent to 200 percent, and turn on high contrast, in this browser.</li>
        </ul>
        <p>
          If you use a screen reader or a braille display and something on this site gets in the way, <Link href="/contact">tell us what you were trying to do</Link>.
        </p>
        <h2>What we will not do</h2>
        <p>
          We will not hide a control in a picture. We will not autoplay sound. We will not require a gesture that has no keyboard or switch equivalent. We will not treat a blind student as a visitor in someone else’s app.
        </p>
      </article>
    </>
  );
}
