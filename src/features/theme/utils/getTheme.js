import { THEME } from './theme';

export function getTheme() {
  try {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(THEME.KEY);
    if (stored === THEME.DARK || stored === THEME.LIGHT) return stored;
  } catch (err) {
    // swallow
  }
  return null;
}
