import { useBreakpoint } from './useBreakpoint';
// import { useTheme } from './useTheme';

export function useDevice() {
  const breakpoint = useBreakpoint();
  // const theme = useTheme();

  return {
    breakpoint,
    // theme,
    isMobile: breakpoint === 'mobile' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
    // isDark: theme === 'dark',
    // isLight: theme === 'light',
  };
}
