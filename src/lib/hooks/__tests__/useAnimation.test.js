import { renderHook } from '@testing-library/react';
import { useScrollReveal, useStagger } from '../useAnimation';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useInView: vi.fn(() => false),
  };
});

import { useInView } from 'framer-motion';

describe('useScrollReveal hook', () => {
  beforeEach(() => {
    vi.mocked(useInView).mockReturnValue(false);
  });

  test('accepts custom preset', () => {
    const { result: result1 } = renderHook(() => useScrollReveal({ preset: 'slideUp' }));
    const { result: result2 } = renderHook(() => useScrollReveal({ preset: 'fadeInUp' }));

    expect(result1.current.props).toBeDefined();
    expect(result2.current.props).toBeDefined();
  });

  test('falls back gracefully for invalid preset', () => {
    const { result } = renderHook(() => useScrollReveal({ preset: 'invalid-preset' }));

    expect(result.current.props).toBeDefined();
  });

  test('accepts custom threshold', () => {
    const { result } = renderHook(() => useScrollReveal({ threshold: 0.5 }));

    expect(result.current.ref).toBeDefined();
    expect(result.current.props).toBeDefined();
  });

  test('accepts and applies custom transition', () => {
    const customTransition = { duration: 0.5, delay: 0.2 };
    const { result } = renderHook(() => useScrollReveal({ transition: customTransition }));

    expect(result.current.props.transition).toEqual(customTransition);
  });

  test('applies default transition duration', () => {
    const { result } = renderHook(() => useScrollReveal());

    expect(result.current.props.transition.duration).toBe(1);
  });

  test('animation state changes based on viewport visibility', () => {
    vi.mocked(useInView).mockReturnValue(false);
    const { result: resultNotInView } = renderHook(() => useScrollReveal());

    expect(resultNotInView.current.props.animate).toBe(resultNotInView.current.props.initial);

    vi.mocked(useInView).mockReturnValue(true);
    const { result: resultInView } = renderHook(() => useScrollReveal());

    expect(resultInView.current.props.animate).not.toBe(resultInView.current.props.initial);
  });

  test('supports multiple instances with different configurations', () => {
    const { result: result1 } = renderHook(() => useScrollReveal({ preset: 'fadeInUp' }));
    const { result: result2 } = renderHook(() =>
      useScrollReveal({ preset: 'slideUp', threshold: 0.2 })
    );

    expect(result1.current.props).toBeDefined();
    expect(result2.current.props).toBeDefined();
    expect(result1.current.ref).not.toBe(result2.current.ref);
  });
});

describe('useStagger hook', () => {
  beforeEach(() => {
    vi.mocked(useInView).mockReturnValue(false);
  });

  test('provides animation variants for stagger items', () => {
    const { result } = renderHook(() => useStagger());
    const { item } = result.current;

    expect(item.variants).toBeDefined();
    expect(item.variants.hidden).toBeDefined();
    expect(item.variants.visible).toBeDefined();
  });

  test('applies custom stagger delay', () => {
    const { result } = renderHook(() => useStagger({ delay: 0.15 }));

    expect(result.current.container.variants.visible.transition.staggerChildren).toBe(0.15);
  });

  test('applies default stagger delay', () => {
    const { result } = renderHook(() => useStagger());

    expect(result.current.container.variants.visible.transition.staggerChildren).toBe(0.08);
  });

  test('applies custom y offset for item animation', () => {
    const { result } = renderHook(() => useStagger({ y: 30 }));

    expect(result.current.item.variants.hidden.y).toBe(30);
  });

  test('applies default y offset for item animation', () => {
    const { result } = renderHook(() => useStagger());

    expect(result.current.item.variants.hidden.y).toBe(20);
  });

  test('accepts custom threshold', () => {
    const { result } = renderHook(() => useStagger({ threshold: 0.5 }));

    expect(result.current.ref).toBeDefined();
  });

  test('container animation state responds to viewport visibility', () => {
    vi.mocked(useInView).mockReturnValue(false);
    const { result: resultNotInView } = renderHook(() => useStagger());

    expect(resultNotInView.current.container.animate).toBe('hidden');

    vi.mocked(useInView).mockReturnValue(true);
    const { result: resultInView } = renderHook(() => useStagger());

    expect(resultInView.current.container.animate).toBe('visible');
  });
});
