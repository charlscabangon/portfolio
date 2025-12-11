import { renderHook, act } from '@testing-library/react';
import { useDevice } from '../useDevice';

describe('useDevice hook', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  test('detects mobile device', () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useDevice());

    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.breakpoint).toBe('mobile');
  });

  test('detects tablet device', () => {
    window.innerWidth = 768;
    const { result } = renderHook(() => useDevice());

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.breakpoint).toBe('md');
  });

  test('detects desktop device', () => {
    window.innerWidth = 1280;
    const { result } = renderHook(() => useDevice());

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(true);
    expect(result.current.breakpoint).toBe('xl');
  });

  test('updates device detection on window resize', () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useDevice());

    expect(result.current.isMobile).toBe(true);

    act(() => {
      window.innerWidth = 1280;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isDesktop).toBe(true);
  });
});
