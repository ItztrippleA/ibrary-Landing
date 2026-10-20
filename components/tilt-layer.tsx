'use client';

import { useEffect } from 'react';

const SELECTOR = '.panel, .level, .plan, .steps li, .photo-frame, .parallax-card, .store';

export function TiltLayer() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (reduce.matches || !fine.matches) return;

    let active: HTMLElement | null = null;

    const clear = (el: HTMLElement) => {
      el.style.transform = '';
      el.classList.remove('is-tilting');
    };

    const onMove = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const card = target.closest(SELECTOR);
      if (!(card instanceof HTMLElement)) {
        if (active) {
          clear(active);
          active = null;
        }
        return;
      }
      if (active && active !== card) clear(active);
      active = card;
      const rect = card.getBoundingClientRect();
      const px = rect.width ? (event.clientX - rect.left) / rect.width : 0.5;
      const py = rect.height ? (event.clientY - rect.top) / rect.height : 0.5;
      const rotateY = (px - 0.5) * 20;
      const rotateX = (0.5 - py) * 16;
      card.classList.add('is-tilting');
      card.style.transform = `perspective(720px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
      card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    };

    const onOut = (event: PointerEvent) => {
      if (!active) return;
      const next = event.relatedTarget;
      if (next instanceof Node && active.contains(next)) return;
      clear(active);
      active = null;
    };

    const onBlur = () => {
      if (!active) return;
      clear(active);
      active = null;
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onOut);
    window.addEventListener('blur', onBlur);

    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
      window.removeEventListener('blur', onBlur);
      if (active) clear(active);
    };
  }, []);

  return null;
}
