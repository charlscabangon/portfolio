import PropTypes from 'prop-types';

import clsx from 'clsx';

export default function TimelineNode({ isActive = false, isFirst = false }) {
  return (
    <div className="border-border dark:border-border px-sm lg:px-md relative flex items-center justify-center md:border-l">
      <div
        className={clsx(
          'absolute top-0 w-px',
          'bg-foreground-secondary dark:bg-foreground-secondary',
          isFirst && 'top-1/2 h-1/2',
          !isFirst && 'top-0 h-full'
        )}
      />
      <div className="bg-foreground-secondary dark:bg-foreground-secondary relative z-10 h-2 w-2 rounded-full" />

      {isActive && (
        <div className="bg-foreground-secondary dark:bg-foreground-secondary absolute h-2 w-2 animate-ping rounded-full" />
      )}
    </div>
  );
}

TimelineNode.propTypes = {
  isActive: PropTypes.bool,
};
