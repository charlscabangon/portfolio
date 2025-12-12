import { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export default function FormTextarea({
  label,
  name,
  value,
  error,
  disabled = false,
  required = false,
  placeholder,
  minRows = 1,
  maxRows = 10,
  inputRef,
  onChange,
  onBlur,
}) {
  const textareaId = `textarea-${name}`;
  const errorId = `${name}-error`;

  const internalRef = useRef(null);

  const textareaRef = inputRef || internalRef;

  const autoResize = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';

    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight) || 24;
    const minHeight = lineHeight * minRows;
    const maxHeight = lineHeight * maxRows;
    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;
  }, [textareaRef, maxRows, minRows]);

  useEffect(() => {
    autoResize();
  }, [autoResize, value]);

  useEffect(() => {
    autoResize();
  }, [autoResize]);

  const handleChange = (e) => {
    onChange(e);
    autoResize();
  };

  return (
    <div>
      <label
        htmlFor={textareaId}
        className="text-foreground-secondary font-code mb-2 block text-sm font-normal"
      >
        {label}
      </label>
      <textarea
        ref={inputRef}
        id={textareaId}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        rows={minRows}
        className={clsx(
          'px-xxs md:px-sm py-xs w-full border-b',
          'text-foreground placeholder:text-foreground-tertiary text-xs font-light md:text-sm',
          'hover:border-foreground transition-all duration-200 ease-out',
          'scrollbar-hide resize-none',
          'focus:ring-border focus:ring-1',
          error ? 'border-error' : 'border-border',
          disabled && 'cursor-not-allowed opacity-50'
        )}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} className="text-error mt-1.5 text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

FormTextarea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};
