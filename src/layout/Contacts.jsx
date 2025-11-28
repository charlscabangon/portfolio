import clsx from 'clsx';
import { SocialIcon } from 'react-social-icons';

import Tooltip from '@/components/ui/Tooltip';
import { CONTACTS } from '@/data/sections/about/socials';

export default function Contacts() {
  return (
    <div
      className={clsx(
        'fixed right-0 bottom-0 z-50',
        'hidden flex-col lg:flex',
        'border-border border bg-[#1a1b1e] p-0.5'
      )}
    >
      <Tooltip content="Send me an email" position="left">
        <SocialIcon
          url={CONTACTS.EMAIL}
          network="email"
          bgColor="transparent"
          fgColor=""
          style={{ width: 43, height: 43 }}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Send me an email"
        />
      </Tooltip>

      <Tooltip content="Connect with me" position="left">
        <SocialIcon
          url={CONTACTS.LINKEDIN}
          network="linkedin"
          bgColor="transparent"
          fgColor=""
          style={{ width: 43, height: 43 }}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Connect with me on LinkedIn"
        />
      </Tooltip>

      <Tooltip content="Visit my Github" position="left">
        <SocialIcon
          url={CONTACTS.GITHUB}
          network="github"
          bgColor="transparent"
          fgColor=""
          style={{ width: 43, height: 43 }}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Visit my Github"
        />
      </Tooltip>
    </div>
  );
}
