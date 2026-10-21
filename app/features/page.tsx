import type { Metadata } from 'next';
import { FeatureSuite } from '@/components/feature-suite';
import { PageIntro } from '@/components/page-intro';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Eight ways into the same JSS1 to SS3 term. A school can switch on read aloud, sign, voice, and text settings without a separate syllabus.',
};

export default function FeaturesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Features"
        title="The same term, more than one way in."
        lede="Eight tools a school can switch on. Choose one to read what it does today. They do not create a separate syllabus. The phone app that uses the camera and the microphone comes later."
        image="/images/practice.jpg"
        alt="Two students in white shirts sit at a desk with open notebooks. One speaks and gestures. The other listens, with headphones around his neck."
      />
      <FeatureSuite heading={false} />
    </>
  );
}
