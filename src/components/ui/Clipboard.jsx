import { useState } from 'react';
import PropTypes from 'prop-types';

import Tooltip from './Tooltip';

export default function Clipboard({
  text,
  children,
  tooltipPosition = 'top',
  tooltipDelay = 0,
  copyText = 'copy',
  copiedText = 'copied!',
  onCopy,
  className,
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      if (onCopy) onCopy(text);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Tooltip
      content={copied ? copiedText : copyText}
      position={tooltipPosition}
      delay={tooltipDelay}
    >
      <button onClick={copyToClipboard} className={className}>
        {children || text}
      </button>
    </Tooltip>
  );
}

Clipboard.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
  tooltipPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  tooltipDelay: PropTypes.number,
  copyText: PropTypes.string,
  copiedText: PropTypes.string,
  onCopy: PropTypes.func,
  className: PropTypes.string,
};
