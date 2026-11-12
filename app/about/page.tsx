import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { Reveal } from '@/components/motion';

export const metadata: Metadata = {
  title: 'About',
  description: 'The personal journey behind iBrary, and the belief that every learner deserves the chance to truly understand.',
};

const chapters = [
  {
    id: 'access',
    mark: '01',
    label: 'Access',
    title: 'Learning materials I could not use alone',
    body: 'As I continued through school in Nigeria, one challenge followed me from classroom to classroom: learning materials were rarely available in formats I could access independently. I often depended on friends and classmates to read textbooks and notes aloud.',
    image: '/images/classroom.jpg',
    alt: 'Secondary students work at wooden desks in a classroom while a teacher stands by the chalkboard.',
  },
  {
    id: 'audio',
    mark: '02',
    label: 'Audio',
    title: 'A library I could revisit',
    body: 'Then, something changed. My classmates began recording lessons as audio files, giving me a personal library I could revisit whenever I needed. For the first time, I could study more independently. It showed me how access to the right learning materials can change a learner’s experience.',
    image: '/images/hero-listen.jpg',
    alt: 'A student wears headphones and follows an open book by hand, with a phone and a stack of books beside them.',
  },
  {
    id: 'pictures',
    mark: '03',
    label: 'Pictures',
    title: 'When science became a picture',
    body: 'Later, when science subjects became difficult to understand, a tutor helped me by creating mental pictures as he explained each concept. Ideas that once felt abstract began to make sense. My academic performance improved dramatically: I moved from last position to fifth in a class of about 28 students, and the subject I had dreaded—Physics—became one I loved.',
    image: '/images/practice.jpg',
    alt: 'Two students sit at a wooden desk and talk through an idea, notebooks open between them.',
  },
] as const;

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

      <nav className="wrap chapter-nav" aria-label="Story chapters">
        <a href="#access">01 Access</a>
        <a href="#audio">02 Audio</a>
        <a href="#pictures">03 Pictures</a>
        <a href="#stories">04 Stories</a>
        <a href="#belief">05 The belief</a>
      </nav>

      <div className="about-story">
        {chapters.map((chapter, index) => (
          <section key={chapter.id} id={chapter.id} className="section about-chapter" aria-labelledby={`${chapter.id}-title`}>
            <div className={`wrap about-split${index % 2 === 1 ? ' is-flipped' : ''}`}>
              <Reveal>
                <div>
                  <p className="eyebrow">Chapter {chapter.mark}</p>
                  <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
                  <p>{chapter.body}</p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <figure className="about-figure">
                  <img src={chapter.image} alt={chapter.alt} />
                </figure>
              </Reveal>
            </div>
          </section>
        ))}

        <section id="stories" className="section about-chapter" aria-labelledby="stories-title">
          <div className="wrap">
            <Reveal>
              <article className="about-turn">
                <p className="eyebrow">Chapter 04</p>
                <h2 id="stories-title">The subject had not changed</h2>
                <p>
                  Years later, I saw a similar transformation in my younger sibling. A different approach to teaching, using stories, relatable examples and interactive explanations, turned a struggle with Mathematics into genuine interest. The subject had not changed. The way it was taught had.
                </p>
                <ul className="about-marks">
                  <li>Stories</li>
                  <li>Relatable examples</li>
                  <li>Interactive explanations</li>
                </ul>
              </article>
            </Reveal>
          </div>
        </section>

        <section id="belief" className="section about-chapter" aria-labelledby="belief-title">
          <div className="wrap about-close">
            <Reveal>
              <div>
                <p className="eyebrow">Chapter 05</p>
                <h2 id="belief-title">iBrary is being built around that belief.</h2>
                <p>
                  These experiences shaped the idea behind iBrary. I wanted to help create a learning experience where students do not simply memorise information or depend on someone else to make it accessible. They should be able to explore concepts in ways that make sense to them, build confidence and develop real understanding.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <blockquote className="about-quote">
                “Every learner deserves not just access to education, but the opportunity to truly understand it.”
              </blockquote>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
