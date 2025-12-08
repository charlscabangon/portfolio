import { useRef } from 'react';
import { useInView } from 'framer-motion';

import * as presets from '@/styles/animation';

export function useScrollReveal({ preset = 'fadeInUp', threshold = 0.3, transition = null } = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const animation = presets[preset] || presets.fadeInUp;

  return {
    ref,
    props: {
      initial: animation.initial,
      animate: isInView ? animation.animate : animation.initial,
      transition: transition || { duration: 1, ease: 'easeOut' },
    },
  };
}

export function useStagger({ threshold = 0.3, delay = 0.08, y = 20 } = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return {
    ref,
    container: {
      initial: 'hidden',
      animate: isInView ? 'visible' : 'hidden',
      variants: {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: delay,
            delayChildren: 0.15,
          },
        },
      },
    },
    item: {
      variants: {
        hidden: { opacity: 0, y: y },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      },
    },
  };
}
