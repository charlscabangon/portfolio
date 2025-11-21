import PropTypes from 'prop-types';

export default function Label({ text }) {
  return (
    <div
      aria-hidden="true"
      className="font-code text-foreground-disabled label-text m-0 flex items-start text-[0.60rem] font-light lg:text-xs"
    >
      <span>{text}</span>
    </div>
  );
}

Label.propTypes = {
  text: PropTypes.string,
};
