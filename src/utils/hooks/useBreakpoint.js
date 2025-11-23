import { useState, useEffect } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(getCurrentBreakpoint());

  useEffect(function () {
    function handleResize() {
      setBreakpoint(getCurrentBreakpoint());
    }

    window.addEventListener('resize', handleResize);
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakpoint;
}

function getCurrentBreakpoint() {
  const width = window.innerWidth;

  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'mobile';
}
