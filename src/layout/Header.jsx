import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 z-50',
          'h-10 md:h-12 lg:h-14',
          'flex w-full items-center justify-end',
          'bg-background dark:bg-background border-border border-b',
          'px-2 md:px-8 lg:px-10'
        )}
      >
        <nav className="hidden h-full items-stretch md:flex">
          <ul className="flex h-full items-stretch">
            <li className="nav-desktop border-l">home</li>
            <li className="nav-desktop border-x">works</li>
            <li className="nav-desktop border-r">about</li>
          </ul>
        </nav>

        <button
          onClick={toggleMenu}
          className="flex items-center rounded-lg md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <EllipsisVerticalIcon className="h-5 w-5" />
        </button>
      </header>

      {/* mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={clsx(
                'fixed top-14 right-4 z-50',
                'bg-surface shadow-md',
                'overflow-hidden',
                'md:hidden'
              )}
            >
              <ul className="py-1">
                <li className="nav-mobile border-b">Home</li>
                <li className="nav-mobile border-b">Works</li>
                <li className="nav-mobile">About</li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
