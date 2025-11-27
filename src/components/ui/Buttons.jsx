import PropTypes from 'prop-types';
import clsx from 'clsx';

export function PrimaryBtn({ children, type = 'button', onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label=""
      className={clsx(
        'btn',
        'bg-surface dark:bg-surface text-surface-foreground dark:text-surface-foreground',
        'transition-opacity hover:opacity-80 active:opacity-60 active:dark:opacity-90'
      )}
    >
      {children}
    </button>
  );
}

export function SecondaryBtn({ children, type = 'button', onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label=""
      className={clsx(
        'btn py-1.5',
        'ring-surface-hover dark:ring-surface-hover focus-visible:ring-primary text-foreground dark:text-foreground ring ring-inset md:ring-2',
        'transition-opacity hover:opacity-60 active:opacity-30 active:dark:opacity-90'
      )}
    >
      {children}
    </button>
  );
}

export function GhostBtn({ children, type = 'button', onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label=""
      className={clsx(
        'relative cursor-pointer',
        'transition-opacity hover:opacity-60 active:opacity-30',
        'text-xs sm:text-sm',
        'after:bg-foreground dark:after:bg-foreground after:absolute after:bottom-0.5 after:-left-0 after:h-px after:w-full md:after:h-0.5'
      )}
    >
      {children}
    </button>
  );
}

PrimaryBtn.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
};

SecondaryBtn.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
};

GhostBtn.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
};
