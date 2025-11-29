import { useState } from 'react';

import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import ThemeToggle from '@/features/Theme/components/ThemeToggle';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { NAV_LINKS } from '@/lib/navLinks';

export default function Header() {
  const [activeNav, setActiveNav] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSetActive = (to) => {
    setActiveNav(to);
  };

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
          'gap-xs flex w-full items-center justify-end',
          'bg-background dark:bg-background border-border border-b',
          'md:gap-sm px-3 md:px-8 lg:px-10'
        )}
      >
        <nav className="hidden h-full items-stretch md:flex">
          <ul className="flex h-full items-stretch">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.id}
                to={link.id}
                spy={true}
                smooth={true}
                offset={-130}
                duration={600}
                delay={0}
                onSetActive={handleSetActive}
                onClick={() => setActiveNav(link.id)}
                className={clsx(
                  'nav-desktop cursor-pointer',
                  activeNav === link.id && 'nav-active',
                  index === 0 && 'border-l',
                  index === NAV_LINKS.length - 1 && 'border-r',
                  index > 0 && index < NAV_LINKS.length - 1 && 'border-x'
                )}
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </nav>

        <ThemeToggle />

        <button
          onClick={toggleMenu}
          className="flex items-center rounded-lg md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <EllipsisVerticalIcon className="h-4 w-4" />
        </button>
      </header>

      {/* mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={clsx(
              'fixed top-11 right-4 z-50',
              'bg-background border shadow-md',
              'overflow-hidden',
              'md:hidden'
            )}
          >
            <ul>
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.id}
                  to={link.id}
                  spy={true}
                  smooth={true}
                  offset={-130}
                  duration={700}
                  delay={0}
                  onSetActive={handleSetActive}
                  onClick={() => {
                    setActiveNav(link.id);
                    closeMenu();
                  }}
                  className={clsx(
                    'nav-mobile cursor-pointer',
                    activeNav === link.id && 'nav-active',
                    index < NAV_LINKS.length - 1 && 'border-b'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
