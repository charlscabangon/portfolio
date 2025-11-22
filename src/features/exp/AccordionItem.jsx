import { useState, memo } from 'react';
import PropTypes from 'prop-types';

import TimelineNode from './TimelineNode';
import Markdown from '@/features/markdown/Markdown';

import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function AccordionItem({ item, isFirst, isLast }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-background dark:bg-background flex">
      <TimelineNode isActive={item.isActive} isFirst={isFirst} />

      <div
        className={clsx(
          'flex w-full flex-col',
          'border-border dark:border-border border-l',
          !isLast && 'border-b'
        )}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            'flex w-full items-center justify-between',
            'py-sm px-md cursor-pointer',
            'text-left transition-colors duration-300',
            'hover:bg-background-secondary hover:dark:bg-background-secondary'
          )}
          aria-expanded={isOpen}
        >
          <div className="flex flex-col items-start gap-1">
            <h6 className="text-foreground dark:text-foreground mb-1">{item.title}</h6>
            <span className="font-body text-foreground-secondary dark:text-foreground-secondary text-xs">
              {item.company}
            </span>
            <span className="font-body text-foreground-secondary dark:text-foreground-secondary text-xs">
              {item.date}
            </span>
          </div>
          <ChevronDownIcon
            className={clsx(
              'text-foreground-secondary dark:text-foreground-secondary h-6 w-6',
              'transition-transform duration-300 ease-out',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        <div
          className={clsx(
            'overflow-hidden transition-all duration-300 ease-out',
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="px-md pt-sm pb-md text-foreground dark:text-foreground text-sm">
            <Markdown dir={item.dir} file={item.filename} />
          </div>
        </div>
      </div>
    </div>
  );
}

AccordionItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    date: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
};

export default memo(AccordionItem);
