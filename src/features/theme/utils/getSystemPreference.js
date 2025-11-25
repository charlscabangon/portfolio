import { THEME } from './keys';

export function getSystemPreference() {
  if (typeof window === 'undefined' || !window.matchMedia) return THEME.LIGHT;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME.DARK : THEME.LIGHT;
}
