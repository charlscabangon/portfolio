import { getAriaLabel } from '../getAriaLabel';

describe('getAriaLabel utility', () => {
  test('returns string when children is a string', () => {
    expect(getAriaLabel('click me')).toBe('click me');
  });

  test('returns first string from array of mixed children', () => {
    expect(getAriaLabel([123, null, 'found it', 'ignored'])).toBe('found it');
  });

  test('returns empty string for non-string values', () => {
    expect(getAriaLabel(null)).toBe('');
    expect(getAriaLabel(undefined)).toBe('');
    expect(getAriaLabel(123)).toBe('');
    expect(getAriaLabel(true)).toBe('');
    expect(getAriaLabel({ text: 'hello' })).toBe('');
    expect(getAriaLabel([])).toBe('');
    expect(getAriaLabel([123, null, undefined])).toBe('');
  });
});
