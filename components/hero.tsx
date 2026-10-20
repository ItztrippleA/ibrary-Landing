'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PageReader } from '@/components/page-reader';

const ease = [0.22, 1, 0.36, 1] as const;

function HeroLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduce = useReducedMotion();
  if (reduce) return children;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Cube({ className }: { className: string }) {
  return (
    <div className={`cube ${className}`}>
      <div className="cube-spin">
        <div className="cube-box">
          <span className="cube-face front" />
          <span className="cube-face back" />
          <span className="cube-face right" />
          <span className="cube-face left" />
          <span className="cube-face top" />
          <span className="cube-face bottom" />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section ref={ref} className="hero-stage" aria-label="Introduction">
      <div className="hero-stage-media">
        <motion.img
          className="hero-stage-img"
          src="/images/hero-listen.jpg"
          alt="A secondary student in a brown shirt wears headphones and follows an open book with one hand, a phone face-down beside a stack of books."
          style={reduce ? undefined : { y: imageY }}
        />
        <div className="hero-stage-shade" aria-hidden="true" />
      </div>
      <div className="hero-cubes" aria-hidden="true">
        <Cube className="cube-1" />
        <Cube className="cube-2" />
        <Cube className="cube-3" />
        <Cube className="cube-4" />
        <Cube className="cube-5" />
        <Cube className="cube-6" />
        <Cube className="cube-7" />
      </div>
      <PageReader />
      <motion.div className="wrap hero-stage-copy" style={reduce ? undefined : { y: copyY }}>
        <div className="hero-copy">
          <HeroLine delay={0.05}>
            <p className="eyebrow">Students and teachers</p>
          </HeroLine>
          <HeroLine delay={0.16}>
            <h1>Learning, adapted to your class.</h1>
          </HeroLine>
          <HeroLine delay={0.28}>
            <p className="lede">
              One term for every student from JSS1 to SS3, and a place for the teacher to share the work. Read it, hear it, or follow it in sign.
            </p>
          </HeroLine>
          <HeroLine delay={0.4}>
            <div className="inline-actions">
              <Link className="button" href="/#waitlist">
                Join the class
              </Link>
              <Link className="button-quiet" href="/#why">
                Learn more
              </Link>
            </div>
          </HeroLine>
        </div>
      </motion.div>
    </section>
  );
}
