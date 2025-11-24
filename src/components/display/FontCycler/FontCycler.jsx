import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import { ICONIC_FONTS } from './helper/fonts';

export default function FontCycler({
  text,
  interval = 3000,
  fonts = ICONIC_FONTS,
  showFontName = false,
  className,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(
    function () {
      const timer = setInterval(function () {
        setCurrentIndex(function (prev) {
          return (prev + 1) % fonts.length;
        });
      }, interval);

      return function () {
        clearInterval(timer);
      };
    },
    [interval, fonts.length]
  );

  const currentFont = fonts[currentIndex];

  return (
    <div className={clsx('w-fit', className)}>
      {/* Animated text */}
      <div className="relative h-16 overflow-hidden sm:h-20 md:h-24 lg:h-20">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 1,
            }}
            style={{ fontFamily: currentFont.family }}
            className="text-3xl font-bold whitespace-nowrap"
          >
            {text}
          </motion.div>
        </AnimatePresence>
      </div>

      {showFontName && (
        <div className="mt-2 h-6 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`name-${currentIndex}`}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 1,
                delay: 0.05,
              }}
              className="text-foreground-disabled font-mono text-sm"
            >
              {currentFont.name}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

FontCycler.propTypes = {
  text: PropTypes.string.isRequired,
  interval: PropTypes.number,
  fonts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  showFontName: PropTypes.bool,
  className: PropTypes.string,
};
