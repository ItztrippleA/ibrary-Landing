import Link from 'next/link';
import { Hero } from '@/components/hero';
import { LaunchBand } from '@/components/launch-band';
import { contactEmail, learningWays, questions } from '@/lib/site';

const audiences = [
  {
    id: 'students',
    title: 'For Students',
    body: 'Ever met a topic that just would not make sense, no matter how many times you read it? iBrary is designed to break complex ideas into clear, relatable explanations and help you learn at your own pace.',
  },
  {
    id: 'teachers',
    title: 'For Teachers',
    body: 'Have a better way of explaining a difficult topic? iBrary will create opportunities for educators to share useful learning resources with students beyond their own classrooms, subject to review and approval.',
  },
  {
    id: 'caregivers',
    title: 'For Parents and Caregivers',
    body: 'Want to support your child’s learning but need a helpful resource to guide the way? iBrary is being designed to make learning clearer, more engaging and easier to follow.',
  },
  {
    id: 'vision',
    title: 'For Visually Impaired Learners',
    body: 'Tired of learning materials that are difficult to access? iBrary is being built to make academic content easier to access through screen-reader-friendly and audio-supported learning experiences.',
  },
  {
    id: 'differences',
    title: 'For Learners with Dyslexia and Other Learning Differences',
    body: 'Does traditional academic content feel too dense, abstract or difficult to follow? iBrary aims to offer clearer explanations and flexible ways to engage with lessons, so more learners can find a way that works for them.',
  },
];

const supportPoints = [
  'Curriculum-aligned learning for Nigerian students',
  'Clear explanations connected to everyday life',
  'Guided AI support that encourages understanding',
  'More accessible ways to read, listen and learn',
];

const educatorMailto = `mailto:${contactEmail}?subject=${encodeURIComponent('Join the iBrary educator community')}&body=${encodeURIComponent('Please add me to the iBrary educator community.\n\nName:\nWhat I teach:\n')}`;

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="section" id="who" aria-labelledby="who-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="who-title">Who is iBrary for?</h2>
            <p>
              A better learning experience should work for more people. iBrary is being built with students, teachers, parents and learners who are often left out of traditional learning experiences in mind.
            </p>
          </div>
          <div className="levels">
            {audiences.map((item) => (
              <article className="panel" id={item.id} key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="guided" aria-labelledby="guided-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <h2 id="guided-title">AI should help you learn—not do the learning for you.</h2>
            <p>
              You should not have to keep prompting a chatbot and hope it gives you an explanation that fits your class, curriculum and learning needs. iBrary brings learning content and guided AI support together in one place, with a focus on understanding, reasoning and progress—not simply getting answers.
            </p>
          </div>
          <ul className="point-list">
            {supportPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="real-life" aria-labelledby="real-life-title" style={{ paddingTop: 0 }}>
        <div className="wrap narrow">
          <h2 id="real-life-title">Learning that connects to real life.</h2>
          <p>
            Complex topics become easier to approach when explanations feel familiar. iBrary is designed to connect academic ideas to relatable examples, stories and guided activities—helping learners build understanding they can use beyond the classroom.
          </p>
        </div>
      </section>

      <section className="section" id="ways" aria-labelledby="ways-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <h2 id="ways-title">Learn in ways that work for you.</h2>
            <p>
              Read, listen and explore lessons in ways that better suit your needs. iBrary is being designed with accessibility and flexibility at its core, including support for learners who use assistive technology or benefit from alternative ways of engaging with content.
            </p>
          </div>
          <div className="levels">
            {learningWays.map((item) => (
              <article className="panel" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="educators" aria-labelledby="educators-title">
        <div className="wrap narrow">
          <h2 id="educators-title">A place for educators to share their knowledge.</h2>
          <p>
            Great teaching should be able to reach learners beyond one classroom. iBrary is developing a way for educators to contribute helpful learning resources—such as audio and video explanations—for review and possible inclusion alongside relevant topics. Approved contributions may also create opportunities for educators to earn when learners engage with their content.
          </p>
          <div className="inline-actions">
            <a className="button" href={educatorMailto}>
              Join the Educator Community
            </a>
          </div>
          <p className="fine">This opens your mail app. This page does not keep a copy.</p>
        </div>
      </section>

      <section className="section" id="parents" aria-labelledby="parents-title" style={{ paddingTop: 0 }}>
        <div className="wrap narrow">
          <p className="eyebrow">For parents</p>
          <h2 id="parents-title">Help your child feel more confident about learning.</h2>
          <p>
            When a child understands what they are learning, confidence can grow with it. iBrary aims to give families another resource for exploring school topics, reinforcing understanding and supporting a more positive learning experience.
          </p>
          <div className="inline-actions">
            <Link className="button" href="/#waitlist">
              Get Launch Updates
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="founder" aria-labelledby="founder-title">
        <div className="wrap narrow">
          <p className="eyebrow">About the founder</p>
          <h2 id="founder-title">A personal journey. A bigger purpose.</h2>
          <p>
            I lost my sight at nine and went on to navigate Nigeria’s education system with limited access to learning materials I could use independently. Audio recordings made by classmates helped me study on my own, while a tutor who explained difficult ideas through mental pictures transformed my experience of science. Later, I watched my younger sibling discover a love for Mathematics when a teacher used stories and relatable examples.
          </p>
          <p>
            Those experiences taught me that sometimes, the problem is not the learner or the subject—it is how the lesson is presented. That belief inspired iBrary: an inclusive learning platform being built to make academic concepts clearer, more engaging and more accessible, so more learners can develop genuine understanding and confidence.
          </p>
          <blockquote className="pull-quote">
            “Every learner deserves not just access to education, but the opportunity to truly understand it.”
          </blockquote>
        </div>
      </section>

      <LaunchBand />

      <section className="section" id="questions" aria-labelledby="questions-title">
        <div className="wrap narrow">
          <h2 id="questions-title">Frequently asked questions</h2>
          <div className="prose">
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
