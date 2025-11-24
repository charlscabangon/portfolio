import PropTypes from 'prop-types';

import Border from '../../ui/Border';
import Label from '../../ui/Label';
import { useDevice } from '@/utils/hooks/useDevice';

export default function Heading({ children, level = 'h1', position, hasLabel = false }) {
  const Tag = level;
  const { theme, isLight, isDark } = useDevice();

  const labelSize = {
    h1: 'text-7xl',
    h2: 'text-6xl',
    h3: 'text-5xl',
    h4: 'text-4xl',
    h5: 'text-3xl',
    h6: 'text-2xl',
  };

  const labelColor = isLight ? 'text-white' : 'text-black';

  return (
    <div>
      {hasLabel && (
        <Label>{`${labelSize[level]} ${labelColor} tracking-tighter text-balance`}</Label>
      )}
      <Border position={position}>
        <Tag>{children}</Tag>
      </Border>
    </div>
  );
}

Heading.propTypes = {
  children: PropTypes.string.isRequired,
  level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  position: PropTypes.oneOf(['left', 'center', 'right']),
  hasLabel: PropTypes.bool,
};
