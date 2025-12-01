import PropTypes from 'prop-types';
import clsx from 'clsx';

export default function Border({
  children,
  border = 'both',
  position = 'left',
  isFront = false,
  className,
}) {
  const borders = {
    both: 'before:block after:block',
    top: 'before:block after:hidden',
    bottom: 'before:hidden after:block',
    none: 'before:hidden after:hidden',
  };
  const positions = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div
      className={clsx(
        borders[border],
        isFront ? 'before:z-10 after:z-10' : 'before:-z-10 after:-z-10',
        'relative flex',
        positions[position],
        'before:bg-border dark:before:bg-border before:absolute before:top-0 before:-left-[100vw] before:h-px before:w-[200vw]',
        'after:bg-border dark:after:bg-border after:absolute after:bottom-0 after:-left-[100vw] after:h-px after:w-[200vw]',
        className
      )}
    >
      {children}
    </div>
  );
}

Border.propTypes = {
  children: PropTypes.node.isRequired,
  border: PropTypes.oneOf(['top', 'bottom', 'both', 'none']),
  position: PropTypes.oneOf(['left', 'center', 'right']),
  isFront: PropTypes.bool,
  className: PropTypes.string,
};
