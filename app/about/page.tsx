import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';

export const metadata: Metadata = {
  title: 'About',
  description: 'The personal journey behind iBrary, and the belief that every learner deserves the chance to truly understand.',
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About the founder"
        title="A personal journey. A bigger purpose."
        lede="At nine years old, I lost my sight. What followed is why iBrary is being built."
        image="/images/library-shelves.jpg"
        alt="A person with headphones follows a book by touch in a quiet library."
      />
      <article className="article prose">
        <p>
          As I continued through school in Nigeria, one challenge followed me from classroom to classroom: learning materials were rarely available in formats I could access independently. I often depended on friends and classmates to read textbooks and notes aloud.
        </p>
        <p>
          Then, something changed. My classmates began recording lessons as audio files, giving me a personal library I could revisit whenever I needed. For the first time, I could study more independently. It showed me how access to the right learning materials can change a learner’s experience.
        </p>
        <p>
          Later, when science subjects became difficult to understand, a tutor helped me by creating mental pictures as he explained each concept. Ideas that once felt abstract began to make sense. My academic performance improved dramatically: I moved from last position to fifth in a class of about 28 students, and the subject I had dreaded—Physics—became one I loved.
        </p>
        <p>
          Years later, I saw a similar transformation in my younger sibling. A different approach to teaching, using stories, relatable examples and interactive explanations, turned a struggle with Mathematics into genuine interest. The subject had not changed. The way it was taught had.
        </p>
        <p>
          These experiences shaped the idea behind iBrary. I wanted to help create a learning experience where students do not simply memorise information or depend on someone else to make it accessible. They should be able to explore concepts in ways that make sense to them, build confidence and develop real understanding.
        </p>
        <p>iBrary is being built around that belief.</p>
        <blockquote className="pull-quote">
          “Every learner deserves not just access to education, but the opportunity to truly understand it.”
        </blockquote>
      </article>
    </>
  );
}
