import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { TiltLayer } from '@/components/tilt-layer';
import { VoiceAsk } from '@/components/voice-ask';
import './globals.css';

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
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
  themeColor: '#121820',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body suppressHydrationWarning>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <TiltLayer />
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
        <VoiceAsk />
      </body>
    </html>
  );
}
