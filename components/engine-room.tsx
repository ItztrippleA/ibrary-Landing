'use client';

import { useState } from 'react';

const agents = [
  {
    id: 'lessons',
    name: 'Lessons',
    summary: 'Subjects and books arranged by class and term, so the year matches the timetable.',
    points: [
      'Mathematics, English Language, and the sciences are in the catalogue',
      'Each class is split into terms 1, 2, and 3',
      'A teacher can upload a course for the school to check',
      'A lesson can be read or heard',
    ],
    extra: [
      'Books sit on the subject they belong to',
      'A course stays pending until the school approves it',
    ],
  },
  {
    id: 'access',
    name: 'Access',
    summary: 'Each student keeps the way they read, hear, or follow a lesson, on the same class as everyone else.',
    points: [
      'Read aloud at a chosen rate',
      'Dyslexia spacing and bionic reading',
      'Sign phrases and a sign avatar when a video exists',
      'Voice commands the school writes',
    ],
    extra: [
      'Gaze navigation is a setting. The camera is for the phone app',
      'Colour is never the only way to know a result',
    ],
  },
  {
    id: 'quizzes',
    name: 'Quizzes',
    summary: 'Each topic has its own quiz. A score is stored in words, with the year kept when a question comes from WAEC.',
    points: [
      'Questions stay with the topic',
      'A WAEC year is kept with the question when we have it',
      'Answers are named, not only coloured',
      'A student can retake a topic and keep their place',
    ],
    extra: [
      'Progress, points, and badges stay on the account',
      'Notices of a result are text as well as a visual alert',
    ],
  },
];

export function EngineRoom() {
  const [current, setCurrent] = useState(0);
  const [deep, setDeep] = useState(false);
  const agent = agents[current];

  return (
    <section className="section" aria-labelledby="engine-title">
      <div className="wrap engine">
        <div>
          <p className="eyebrow">How it is organised</p>
          <h2 id="engine-title">Three parts of the same class.</h2>
          <p>Lessons, access, and quizzes. Switch between them to see what each one holds.</p>
          <div className="engine-tabs" role="tablist" aria-label="Parts of iBrary">
            {agents.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={current === index}
                aria-controls={`panel-${item.id}`}
                className={current === index ? 'is-on' : ''}
                onClick={() => {
                  setCurrent(index);
                  setDeep(false);
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div
          className="engine-panel"
          role="tabpanel"
          id={`panel-${agent.id}`}
          aria-labelledby={`tab-${agent.id}`}
        >
          <p className="kicker">In the product</p>
          <h3>{agent.name}</h3>
          <p>{agent.summary}</p>
          <h4>What you can do</h4>
          <ul>
            {agent.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
            {deep
              ? agent.extra.map((point) => (
                  <li key={point}>{point}</li>
                ))
              : null}
          </ul>
          <button type="button" className="button" aria-expanded={deep} onClick={() => setDeep((value) => !value)}>
            {deep ? 'Show less' : 'Deep dive'}
          </button>
        </div>
      </div>
    </section>
  );
}
