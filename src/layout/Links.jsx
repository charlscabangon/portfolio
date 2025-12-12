import { motion } from 'framer-motion';
import clsx from 'clsx';

import { Tooltip } from '@/components/ui';
import { getLink } from '@/data/sections/about/links';
import { downloadResume } from '@/lib/utils';
import { slideUp, transition } from '@/styles/animation';
import { SocialIcon } from 'react-social-icons';
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';

export default function Links() {
  return (
    <motion.div
      {...slideUp}
      transition={{ ...transition.slow }}
      className={clsx(
        'fixed right-0 bottom-0 z-50',
        'hidden flex-col items-center justify-center lg:flex',
        'border-border py-xs border bg-[#1a1b1e] px-0.5'
      )}
    >
      <Tooltip content="download my resume" position="left">
        <button onClick={downloadResume} aria-label="Download my resume">
          <ArrowDownTrayIcon className="hover-fade h-5 w-9 text-white" />
        </button>
      </Tooltip>

      <Tooltip content="connect with me" position="left">
        <SocialIcon
          url={getLink('linkedin').href}
          network="linkedin"
          bgColor="transparent"
          fgColor=""
          style={{ width: 43, height: 43 }}
          className="hover-fade"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Connect with me on LinkedIn"
        />
      </Tooltip>

      <Tooltip content="visit my Github" position="left">
        <SocialIcon
          url={getLink('github').href}
          network="github"
          bgColor="transparent"
          fgColor=""
          style={{ width: 43, height: 43 }}
          className="hover-fade"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Visit my Github"
        />
      </Tooltip>
    </motion.div>
  );
}
