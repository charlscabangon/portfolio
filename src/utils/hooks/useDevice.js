import { useBreakpoint } from './useBreakpoint';
import { useTheme } from '@/features/theme/utils/hooks/useTheme';
export function useDevice() {
  const breakpoint = useBreakpoint();
  const { theme, isDark, isLight } = useTheme();

  return {
    breakpoint,
    theme,
    isMobile: breakpoint === 'mobile' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
    isDark,
    isLight,
  };
}
