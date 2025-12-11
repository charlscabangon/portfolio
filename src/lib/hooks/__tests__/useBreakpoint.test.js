import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useBreakpoint } from '../useBreakpoint';

describe('useBreakpoint hook', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  test.each([
    { width: 320, expected: 'mobile' },
    { width: 639, expected: 'mobile' },
    { width: 640, expected: 'sm' },
    { width: 700, expected: 'sm' },
    { width: 768, expected: 'md' },
    { width: 900, expected: 'md' },
    { width: 1024, expected: 'lg' },
    { width: 1100, expected: 'lg' },
    { width: 1280, expected: 'xl' },
    { width: 1400, expected: 'xl' },
    { width: 1536, expected: '2xl' },
    { width: 1920, expected: '2xl' },
  ])('returns $expected for width $width', ({ width, expected }) => {
    window.innerWidth = width;
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe(expected);
  });

  test.each([
    { width: 640, expected: 'sm', description: 'sm boundary (640px)' },
    { width: 1024, expected: 'lg', description: 'lg boundary (1024px)' },
    { width: 1536, expected: '2xl', description: '2xl boundary (1536px)' },
  ])('returns consistent breakpoint at $description', ({ width, expected }) => {
    window.innerWidth = width;
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe(expected);
  });

  test('updates breakpoint on window resize', () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe('mobile');

    act(() => {
      window.innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe('lg');
  });

  test('handles multiple resize events', () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe('mobile');

    act(() => {
      window.innerWidth = 768;
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe('md');

    act(() => {
      window.innerWidth = 1280;
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe('xl');
  });

  test('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useBreakpoint());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
