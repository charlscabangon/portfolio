import PropTypes from 'prop-types';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import Links from './Links';
import { slideInLeft, slideInRight, transition } from '@/styles/animation';

export default function AppLayout({ children }) {
  return (
    <div
      className={clsx(
        'grid min-h-dvh overflow-hidden',
        'grid-cols-1',
        'sm:grid-cols-[40px_1fr_40px]',
        'lg:grid-cols-[60px_1fr_60px]',
        '2xl:grid-cols-[1fr_60px_minmax(1280px,2fr)_60px_1fr]'
      )}
    >
      <div className="hidden 2xl:block"></div>

      <motion.div
        {...slideInLeft}
        transition={{ ...transition.slow }}
        className="pattern-stripes border-border hidden h-full border-x sm:block"
      ></motion.div>

      <main>{children}</main>

      <motion.div
        {...slideInRight}
        transition={{ ...transition.slow }}
        className="pattern-stripes border-border hidden h-full border-x sm:block"
      ></motion.div>

      <div className="hidden 2xl:block"></div>
      <Links />
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
