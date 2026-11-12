'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ParallaxBand, Reveal } from '@/components/motion';
import { contactEmail, learningWays, questions } from '@/lib/site';

const educatorMailto = `mailto:${contactEmail}?subject=${encodeURIComponent('Join the iBrary educator community')}&body=${encodeURIComponent('Please add me to the iBrary educator community.\n\nName:\nWhat I teach:\n')}`;

const audiences = [
  {
    id: 'students',
    title: 'For Students',
    mark: '01',
    image: '/images/classroom.jpg',
    alt: 'Secondary students in white shirts work at wooden desks. One student wears headphones and reads, while a teacher stands by the chalkboard.',
    body: 'Ever met a topic that just would not make sense, no matter how many times you read it? iBrary is designed to break complex ideas into clear, relatable explanations and help you learn at your own pace.',
  },
  {
    id: 'teachers',
    title: 'For Teachers',
    mark: '02',
    image: '/images/practice.jpg',
    alt: 'Two students in white shirts sit at a wooden desk and talk through an idea, with open notebooks between them.',
    body: 'Looking for a better way to explain a difficult topic? iBrary will create opportunities for educators to share useful learning resources with students beyond their own classrooms, subject to review and approval.',
  },
  {
    id: 'caregivers',
    title: 'For Parents and Caregivers',
    mark: '03',
    image: '/images/library-shelves.jpg',
    alt: 'A person wearing headphones reads an open book in a library, with tall wooden shelves behind them.',
    body: 'Want to support your child’s learning and need a helpful resource to guide the way? iBrary is being designed to make learning clearer, more engaging and easier to follow.',
  },
  {
    id: 'vision',
    title: 'For Visually Impaired Learners',
    mark: '04',
    image: '/images/hero-listen.jpg',
    alt: 'A secondary student in a brown shirt wears headphones and follows an open book with one hand, a phone face-down beside a stack of books.',
    body: 'Tired of learning materials that are difficult to access? iBrary is being built to make academic content easier to access through screen-reader-friendly and audio-supported learning experiences.',
  },
  {
    id: 'differences',
    title: 'For Learners with Dyslexia and Other Learning Differences',
    mark: '05',
    image: '/images/classroom.jpg',
    alt: 'A student wearing headphones reads at a wooden desk in a classroom, with classmates writing nearby.',
    body: 'Does traditional academic content feel too dense, abstract or difficult to follow? iBrary aims to offer clearer explanations and flexible ways to engage with lessons, so more learners can find a way that works for them.',
  },
] as const;

const supportPoints = [
  { title: 'Curriculum-aligned', body: 'Curriculum-aligned learning for Nigerian students.' },
  { title: 'Everyday examples', body: 'Clear explanations connected to everyday life.' },
  { title: 'Guided support', body: 'Guided AI support that encourages understanding.' },
  { title: 'More than one way in', body: 'More accessible ways to read, listen and learn.' },
];

const wayIcons = ['access', 'guide', 'curriculum'] as const;

function Icon({ name }: { name: string }) {
  const common = {
    viewBox: '0 0 32 32',
    fill: 'none',
    'aria-hidden': true as const,
    className: 'flow-icon',
  };
  if (name === 'student') {
    return (
      <svg {...common}>
        <circle cx="16" cy="11" r="4.2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M7 24.5c1.4-3.6 4.6-5.5 9-5.5s7.6 1.9 9 5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === 'teacher') {
    return (
      <svg {...common}>
        <path d="M6 13.5 16 8l10 5.5L16 19 6 13.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M11 16.2V21c0 1.6 2.2 3 5 3s5-1.4 5-3v-4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === 'family') {
    return (
      <svg {...common}>
        <circle cx="11" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="21" cy="13" r="2.4" stroke="currentColor" strokeWidth="1.7" />
        <path d="M5.5 23c.8-3 3-4.6 5.5-4.6S15.7 20 16.5 23M17 23c.5-2.2 2-3.5 4-3.5 1.8 0 3.2 1 3.8 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === 'listen') {
    return (
      <svg {...common}>
        <path d="M8 16v-1a8 8 0 0 1 16 0v1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <rect x="6" y="15" width="4.5" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.7" />
        <rect x="21.5" y="15" width="4.5" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (name === 'read') {
    return (
      <svg {...common}>
        <path d="M7 9.5h7.2c1.6 0 2.8 1 2.8 2.4V23c-1.2-.8-2.6-1.2-4.2-1.2H7V9.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M25 9.5h-7.2C16.2 9.5 15 10.5 15 11.9V23c1.2-.8 2.6-1.2 4.2-1.2H25V9.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === 'access') {
    return (
      <svg {...common}>
        <circle cx="16" cy="16" r="8.5" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="16" cy="16" r="2.2" fill="currentColor" />
        <path d="M16 7.5v3.2M16 21.3v3.2M7.5 16h3.2M21.3 16h3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === 'guide') {
    return (
      <svg {...common}>
        <circle cx="9" cy="22" r="2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="16" cy="15" r="2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="23" cy="8" r="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M10.6 20.4 14.4 16.6M17.6 13.4 21.4 9.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === 'curriculum') {
    return (
      <svg {...common}>
        <rect x="8" y="6.5" width="16" height="19" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 12h8M12 16.5h8M12 21h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M9 16.5 13.2 21 23 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const audienceIcons = ['student', 'teacher', 'family', 'listen', 'read'] as const;

export function HomeFlow() {
  const [activeId, setActiveId] = useState<(typeof audiences)[number]['id']>('students');
  const reduce = useReducedMotion();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = audiences.find((item) => item.id === activeId) ?? audiences[0];

  function moveTab(next: number) {
    const index = (next + audiences.length) % audiences.length;
    setActiveId(audiences[index].id);
    tabs.current[index]?.focus();
  }

  return (
    <>
      <section className="section flow-section" id="who" aria-labelledby="who-title">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">Who it is for</p>
              <h2 id="who-title">Who is iBrary for?</h2>
              <p>
                A better learning experience should work for more people. Choose a group to see how iBrary is being built with them in mind.
              </p>
            </div>
          </Reveal>
          <div className="audience-stage">
            <div className="audience-tabs" role="tablist" aria-label="Who iBrary is for">
              {audiences.map((item, index) => {
                const selected = item.id === active.id;
                return (
                  <button
                    key={item.id}
                    id={item.id}
                    ref={(node) => {
                      tabs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="audience-panel"
                    tabIndex={selected ? 0 : -1}
                    className={selected ? 'audience-tab is-on' : 'audience-tab'}
                    onClick={() => setActiveId(item.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                        event.preventDefault();
                        moveTab(index + 1);
                      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                        event.preventDefault();
                        moveTab(index - 1);
                      } else if (event.key === 'Home') {
                        event.preventDefault();
                        moveTab(0);
                      } else if (event.key === 'End') {
                        event.preventDefault();
                        moveTab(audiences.length - 1);
                      }
                    }}
                  >
                    <span className="audience-mark">{item.mark}</span>
                    <Icon name={audienceIcons[index]} />
                    <span>{item.title.replace(/^For /, '')}</span>
                  </button>
                );
              })}
            </div>
            <div
              id="audience-panel"
              role="tabpanel"
              aria-labelledby={active.id}
              className="audience-panel"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  className="audience-panel-inner"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img src={active.image} alt={active.alt} />
                  <div className="audience-copy">
                    <p className="eyebrow">{active.title}</p>
                    <p>{active.body}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="section flow-section" id="guided" aria-labelledby="guided-title">
        <div className="wrap story-split">
          <Reveal>
            <div>
              <p className="eyebrow">Guided support</p>
              <h2 id="guided-title">AI should help you learn—not do the learning for you.</h2>
              <p>
                You should not have to keep prompting a chatbot and hoping it gives you an explanation that fits your class, curriculum and learning needs. iBrary brings learning content and guided AI support together in one place, with a focus on understanding, reasoning and progress—not simply getting answers.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="support-grid">
              {supportPoints.map((point, index) => (
                <li key={point.title}>
                  <span className="support-no">0{index + 1}</span>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section flow-band" id="real-life" aria-labelledby="real-life-title">
        <div className="wrap">
          <ParallaxBand
            src="/images/practice.jpg"
            alt="Two students talk through a lesson at a wooden desk, notebooks open in front of them."
          >
            <p className="eyebrow">In the lesson</p>
            <h2 id="real-life-title">Learning that connects to real life.</h2>
            <p>
              Complex topics become easier to approach when explanations feel familiar. iBrary is designed to connect academic ideas to relatable examples, stories and guided activities—helping learners build understanding they can use beyond the classroom.
            </p>
          </ParallaxBand>
        </div>
      </section>

      <section className="section flow-section" id="ways" aria-labelledby="ways-title">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">How you learn</p>
              <h2 id="ways-title">Learn in ways that work for you.</h2>
              <p>
                Read, listen to, and explore lessons in ways that better suit your needs. iBrary is being designed with accessibility and flexibility at its core, including support for learners who use assistive technology or benefit from alternative ways of engaging with content.
              </p>
            </div>
          </Reveal>
          <div className="way-track">
            {learningWays.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <article className="way-card">
                  <span className="way-icon">
                    <Icon name={wayIcons[index]} />
                  </span>
                  <span className="way-step">Step {index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section flow-section" aria-labelledby="paths-title">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">Bring someone with you</p>
              <h2 id="paths-title">Teachers and families have a place here too.</h2>
            </div>
          </Reveal>
          <div className="path-grid">
            <Reveal>
              <article className="path-card" id="educators">
                <img
                  src="/images/practice.jpg"
                  alt="Two students sit across a desk and explain an idea to each other."
                />
                <div>
                  <h3 id="educators-title">A place for educators to share their knowledge.</h3>
                  <p>
                    Great teaching should be able to reach learners beyond one classroom. iBrary is developing a way for educators to contribute helpful learning resources—such as audio and video explanations—for review and possible inclusion alongside relevant topics. Approved contributions may also create opportunities for educators to earn when learners engage with their content.
                  </p>
                  <a className="button" href={educatorMailto}>
                    Join the Educator Community
                  </a>
                  <p className="fine">This opens your mail app. This page does not keep a copy.</p>
                </div>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="path-card" id="parents">
                <img
                  src="/images/library-shelves.jpg"
                  alt="Someone reads with headphones on, seated in front of library shelves."
                />
                <div>
                  <p className="eyebrow">For parents</p>
                  <h3 id="parents-title">Help your child feel more confident about learning.</h3>
                  <p>
                    When a child understands what they are learning, confidence can grow with it. iBrary aims to give families another resource for exploring school topics, reinforcing understanding and supporting a more positive learning experience.
                  </p>
                  <Link className="button" href="/#waitlist">
                    Get Launch Updates
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section flow-section" id="founder" aria-labelledby="founder-title">
        <div className="wrap founder-layout">
          <Reveal>
            <figure className="founder-photo">
              <img
                src="/images/hero-listen.jpg"
                alt="A student listens with headphones while following an open book by hand."
              />
              <figcaption>Lessons should be something a learner can follow on their own.</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.06}>
            <div>
              <p className="eyebrow">About the founder</p>
              <h2 id="founder-title">A personal journey. A bigger purpose.</h2>
              <ol className="journey">
                <li>
                  <span>01</span>
                  <p>I lost my sight at nine. Audio recordings made by classmates were what let me study Nigeria’s curriculum on my own.</p>
                </li>
                <li>
                  <span>02</span>
                  <p>A tutor who explained difficult ideas through mental pictures transformed my experience of science.</p>
                </li>
                <li>
                  <span>03</span>
                  <p>My younger sibling discovered a love for Mathematics when a teacher used stories and relatable examples.</p>
                </li>
              </ol>
              <p>
                Sometimes the problem is not the learner or the subject. It is how the lesson is presented. That belief is why iBrary is being built: clearer, more engaging, more accessible academic concepts.
              </p>
              <blockquote className="pull-quote">
                “Every learner deserves not just access to education, but the opportunity to truly understand it.”
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section flow-section" id="questions" aria-labelledby="questions-title">
        <div className="wrap faq-layout">
          <Reveal>
            <div>
              <p className="eyebrow">Questions</p>
              <h2 id="questions-title">Frequently asked questions</h2>
              <p className="faq-lead">Open a question to read the answer. Nothing here is a chatbot.</p>
              <img
                className="faq-photo"
                src="/images/classroom.jpg"
                alt="A classroom of secondary students, with one learner reading in headphones at the front desk."
              />
            </div>
          </Reveal>
          <div className="faq-list">
            {questions.map((item) => (
              <details key={item.q} className="faq">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
