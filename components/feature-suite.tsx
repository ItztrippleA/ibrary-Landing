'use client';

import { useState } from 'react';

const tools = [
  {
    group: 'Vision',
    title: 'Sign phrases',
    body: 'The school adds the signs a class needs: a gloss, a meaning, and a video when one exists.',
    more: 'A teacher or admin writes the phrase in the school desk. Students see the same list. The phone will play the video when the app opens.',
  },
  {
    group: 'Navigation',
    title: 'Gaze navigation',
    body: 'A student can turn on hands-free movement through a lesson.',
    more: 'The setting is saved on the account. The camera work lives in the phone app, which is not out yet. This website does not watch anyone.',
  },
  {
    group: 'Voice',
    title: 'Voice commands',
    body: 'Spoken phrases open the next lesson, a quiz, or progress.',
    more: 'The school edits the phrase and the action. “Read this”, “next lesson”, “repeat”, and “my progress” are already prepared.',
  },
  {
    group: 'Reading',
    title: 'Bionic reading',
    body: 'The start of each word can be marked so the line is easier to keep.',
    more: 'It is a setting on the student’s own account. The spoken lesson stays beside it.',
  },
  {
    group: 'Reading',
    title: 'Dyslexia mode',
    body: 'Wider spacing and larger type, for that student only.',
    more: 'The class, the term, and the quiz do not change. Only the way the text is set.',
  },
  {
    group: 'Visual',
    title: 'Sign avatar',
    body: 'A phrase with a video can be shown as a signer on screen.',
    more: 'Turn it on when a student reads sign as well as speech. The video is the one the school attached.',
  },
  {
    group: 'Voice',
    title: 'Read aloud',
    body: 'A topic can be spoken at a rate the student sets.',
    more: 'Sound waits until they ask for it, so it does not talk over a screen reader. A short demo is on the home page.',
  },
  {
    group: 'Alerts',
    title: 'Visual notices',
    body: 'Results and reminders can be shown in high contrast.',
    more: 'The same notice is still text, so a screen reader or a braille display can read it.',
  },
];

export function FeatureSuite({ heading = true }: { heading?: boolean }) {
  const [open, setOpen] = useState(0);

  return (
    <section
      className="section"
      id={heading ? 'features' : undefined}
      aria-labelledby={heading ? 'features-title' : undefined}
      aria-label={heading ? undefined : 'Feature suite'}
    >
      <div className="wrap">
        {heading ? (
          <div className="section-head">
            <p className="eyebrow">Feature suite</p>
            <h2 id="features-title">The same term, more than one way in.</h2>
            <p>
              Eight tools a school can switch on. Choose one to read what it does today. The phone app that uses the camera and the microphone comes later.
            </p>
          </div>
        ) : null}
        <div className="suite">
          {tools.map((tool, index) => (
            <button
              key={tool.title}
              type="button"
              className={open === index ? 'suite-card is-open' : 'suite-card'}
              aria-pressed={open === index}
              onClick={() => setOpen(index)}
            >
              <span className="kicker">{tool.group}</span>
              <span className="suite-title">{tool.title}</span>
              <span className="suite-body">{tool.body}</span>
              <span className="suite-more">Explore</span>
            </button>
          ))}
        </div>
        <div className="suite-detail" role="region" aria-live="polite">
          <p className="kicker">{tools[open].group}</p>
          <h3>{tools[open].title}</h3>
          <p>{tools[open].more}</p>
        </div>
      </div>
    </section>
  );
}
