import PropTypes from 'prop-types';

import clsx from 'clsx';

export default function Label({ children, position = 'left', margin = false }) {
  if (!children) return null;

  const positions = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div
      aria-hidden="true"
      className={clsx(
        'flex items-start',
        positions[position],
        margin && 'mx-sm',
        'font-code text-foreground-disabled label-text text-[0.60rem] font-light lg:text-xs select-none'
      )}
    >
      <span>{children}</span>
    </div>
  );
}

Label.propTypes = {
  children: PropTypes.string,
  position: PropTypes.oneOf(['left', 'center', 'right']),
  margin: PropTypes.bool,
};
