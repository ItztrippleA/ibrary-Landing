import Link from 'next/link';
import { AudioHub } from '@/components/audio-hub';
import { EngineRoom } from '@/components/engine-room';
import { FeatureSuite } from '@/components/feature-suite';
import { Hero } from '@/components/hero';
import { LaunchBand } from '@/components/launch-band';
import { appOpensLabel, levels, plans } from '@/lib/site';

const journeys = [
  {
    href: '/learn',
    kicker: 'Students',
    title: 'For students',
    body: 'Open your class, follow the term, and keep your progress. Hear the lesson or follow a sign when that helps.',
    chips: ['Lessons', 'Quizzes', 'Progress'],
  },
  {
    href: '/schools',
    kicker: 'Teachers',
    title: 'For teachers',
    body: 'Upload a course once. The school reviews it before it reaches a class. iBrary does not replace the teacher in the room.',
    chips: ['Upload', 'Review', 'Same term'],
  },
  {
    href: '/schools',
    kicker: 'Schools',
    title: 'For schools',
    body: 'Turn tools on, write the voice phrases, and see how many students use each setting.',
    chips: ['Access', 'People', 'Notices'],
  },
];

const reasons = [
  {
    title: 'One class',
    body: 'Blind students, low-vision students, and everyone else open the same JSS1 to SS3 timetable.',
  },
  {
    title: 'The term stays put',
    body: 'Subjects and books are grouped the way the year is taught, in terms 1, 2, and 3.',
  },
  {
    title: 'Teachers stay',
    body: 'A course can be shared once and checked before students see it. The teacher in the room is still the teacher.',
  },
  {
    title: 'More than one way in',
    body: 'Read it, hear it, or follow a sign. Colour is never the only way to know a result.',
  },
  {
    title: 'A saved place',
    body: 'Progress, points, and badges stay on the account, so a student can leave and come back.',
  },
  {
    title: 'A calmer page',
    body: 'Sound does not start by itself. Notices are text, so a screen reader or a braille display can read them.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <LaunchBand />
      <AudioHub />

      <section className="section" id="journeys" aria-labelledby="journey-title">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Journeys</p>
            <h2 id="journey-title">Choose where you sit in the class.</h2>
            <p>Students, teachers, and schools use the same year. Each door opens the part that belongs to you.</p>
          </div>
          <div className="levels journey">
            {journeys.map((item) => (
              <Link className="panel journey-card" href={item.href} key={item.title}>
                <p className="kicker">{item.kicker}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <p className="chip-row">
                  {item.chips.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </p>
                <span className="suite-more">Enter</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeatureSuite />
      <EngineRoom />

      <section className="section" id="why" aria-labelledby="why-title">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Why it matters</p>
            <h2 id="why-title">Secondary school, open to the whole class.</h2>
            <p>
              Built for Nigerian secondary schools, from JSS1 to SS3. Access tools are part of the product, not a separate track with easier work.
            </p>
          </div>
          <div className="levels">
            {reasons.map((item) => (
              <article className="panel" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="classes-title">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Classes</p>
            <h2 id="classes-title">Six years, three terms each.</h2>
          </div>
          <div className="levels">
            {levels.map(([name, detail]) => (
              <article className="level" key={name}>
                <h3>{name}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section ink-band" id="plans">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Plans</p>
            <h2>Simple school-year pricing.</h2>
            <p className="lede">
              These are the plans prepared in iBrary. A referral from a classmate takes 10% off, and a purse on the account can hold credit toward a plan. Payment runs through Paystack, in naira.
            </p>
            <div className="inline-actions">
              <Link className="button" href="/contact">
                Ask about a plan
              </Link>
              <Link className="button-quiet" href="/schools">
                For schools
              </Link>
            </div>
          </div>
          <div className="plans">
            {plans.map((plan) => (
              <article className="plan" key={plan.name}>
                <h3>{plan.name}</h3>
                <p className="price">{plan.price}</p>
                <p>{plan.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap cta-band">
          <div>
            <p className="eyebrow">The phone</p>
            <h2>Ready when the app opens.</h2>
            <p>
              The learning app opens {appOpensLabel}. Join the waitlist and the Google Play or App Store link arrives by email. This page does not keep a copy.
            </p>
          </div>
          <Link className="button" href="/#waitlist">
            Join the waitlist
          </Link>
        </div>
      </section>
    </>
  );
}
