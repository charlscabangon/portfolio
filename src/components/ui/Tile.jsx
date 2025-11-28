import PropTypes from 'prop-types';
import clsx from 'clsx';

export default function Tile({ children, src, title, gridClass, onClick, className }) {
  if (children) {
    return (
      <div
        className={clsx(
          'relative overflow-hidden',
          'rounded-md border shadow-md',
          'border-border bg-background-secondary',
          gridClass,
          className
        )}
      >
        {children}
      </div>
    );
  }

  if (!src) {
    console.warn('Tile: src prop is required when children is not provided');
    return null;
  }

  return (
    <button
      onClick={onClick}
      className={clsx(
        'group relative overflow-hidden',
        'rounded-md border shadow-md',
        'border-border bg-background-secondary',
        'cursor-pointer transition-all duration-200',
        gridClass
      )}
      aria-label={`View ${title}`}
    >
      <img
        src={src}
        alt={title}
        className={clsx(
          'absolute inset-0 h-full w-full object-cover',
          'transition-opacity duration-200'
        )}
        loading="lazy"
      />
      {onClick && (
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
      )}
    </button>
  );
}

Tile.propTypes = {
  children: PropTypes.node,
  src: PropTypes.string,
  title: PropTypes.string,
  gridClass: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
