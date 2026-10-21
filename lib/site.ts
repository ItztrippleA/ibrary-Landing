export const contactEmail = 'hello@ibrary.app';

/** Phone app opening. Change this when the date is set. */
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
    title: 'Product',
    links: [
      { href: '/features', label: 'Read aloud' },
      { href: '/features', label: 'Gaze navigation' },
      { href: '/features', label: 'Voice commands' },
    ],
  },
  {
    title: 'Community',
    links: [
      { href: '/schools', label: 'Schools' },
      { href: '/learn', label: 'Classes' },
      { href: '/faq', label: 'Questions' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { href: '/contact', label: 'Support' },
      { href: '/schools', label: 'Schools desk' },
      { href: '/accessibility', label: 'Accessibility' },
    ],
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
