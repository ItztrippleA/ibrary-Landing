import type { Metadata, Viewport } from 'next';
import { Geist, Lexend } from 'next/font/google';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { TiltLayer } from '@/components/tilt-layer';
import './globals.css';

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const readable = Lexend({
  subsets: ['latin'],
  variable: '--font-readable',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ibrary.app'),
  title: {
    default: 'iBrary — the whole class, one term',
    template: '%s · iBrary',
  },
  description:
    'iBrary is for every student and teacher in Nigerian secondary school, from JSS1 to SS3. Lessons, quizzes, and progress, with ways to read, hear, or follow a lesson in sign.',
  applicationName: 'iBrary',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#6c489c',
  colorScheme: 'dark',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${readable.variable}`}>
      <body suppressHydrationWarning>
        <nav className="skip-links" aria-label="Shortcuts">
          <a className="skip" href="#content">
            Skip to content
          </a>
          <a className="skip" href="#access-launcher">
            Accessibility
          </a>
          <a className="skip" href="#speak-button">
            Speak to iBrary
          </a>
        </nav>
        <TiltLayer />
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
