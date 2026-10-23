export const contactEmail = 'hello@ibrary.app';

/**
 * Held until a launch date is confirmed for the public site.
 * Do not show this on the landing page before then.
 */
export const appOpensAt = '2027-01-12T09:00:00+01:00';
export const appOpensLabel = '12 January 2027';

export const primaryNav = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export const footerColumns = [
  {
    title: 'Who it is for',
    links: [
      { href: '/#students', label: 'For Students' },
      { href: '/#educators', label: 'For Educators' },
      { href: '/#parents', label: 'For Parents' },
    ],
  },
  {
    title: 'iBrary',
    links: [
      { href: '/about', label: 'About iBrary' },
      { href: '/accessibility', label: 'Accessibility' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Use' },
    ],
  },
] as const;

export const learningWays = [
  {
    title: 'Accessible by Design',
    body: 'A learning experience being built with screen-reader users and different access needs in mind.',
  },
  {
    title: 'Guided Learning Support',
    body: 'Get help working through ideas and questions, with an emphasis on understanding the steps—not just the final answer.',
  },
  {
    title: 'Made for the Nigerian Curriculum',
    body: 'Learning content shaped around the Nigerian school context, so explanations feel relevant to what students are studying.',
  },
] as const;

export const questions = [
  {
    q: 'What is iBrary?',
    a: 'iBrary is an inclusive learning platform being built to help Nigerian secondary-school students understand curriculum-aligned topics through clear explanations, relatable learning content and guided support.',
  },
  {
    q: 'Is iBrary just another AI chatbot?',
    a: 'No. iBrary is being designed around structured learning content and guided support. The aim is to help students understand concepts and develop their reasoning, rather than simply receive answers.',
  },
  {
    q: 'Who is iBrary for?',
    a: 'iBrary is designed for secondary-school students, including learners with visual impairments, dyslexia and other learning differences. It also aims to support teachers and parents.',
  },
  {
    q: 'Can visually impaired students use iBrary?',
    a: 'Accessibility is a core part of iBrary’s design. The platform is being developed with screen-reader-friendly and audio-supported learning in mind. Specific features will depend on the version released.',
  },
  {
    q: 'Can teachers contribute learning materials?',
    a: 'iBrary is developing a process for educators to submit useful audio or video resources for review. Approved materials may be included alongside relevant lessons, with potential earning opportunities based on learner engagement.',
  },
  {
    q: 'When will iBrary launch?',
    a: 'Join the launch update list to receive announcements when the release date and access details are confirmed.',
  },
] as const;

export const moreNav = [
  { href: '/faq', label: 'Questions' },
  { href: '/contact', label: 'Contact' },
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
] as const;

export const plans = [
  {
    name: 'Monthly',
    price: 'NGN 2,500',
    detail: 'Billed every month. Cancel any time.',
  },
  {
    name: '6 months',
    price: 'NGN 6,000',
    detail: 'One payment that covers more than a term.',
  },
  {
    name: 'Yearly',
    price: 'NGN 24,000',
    detail: 'A full school year, with 5% off the list price.',
  },
] as const;

export const levels = [
  ['JSS1', 'The first year of junior secondary.'],
  ['JSS2', 'The middle year, still building the basics.'],
  ['JSS3', 'Junior exams, and the move toward senior school.'],
  ['SS1', 'The start of the senior syllabus.'],
  ['SS2', 'A long year of practice before the final stretch.'],
  ['SS3', 'Revision, past questions, and the exams ahead.'],
] as const;
