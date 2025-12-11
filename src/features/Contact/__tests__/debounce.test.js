import { debounce } from '../utils/debounce';

describe('debounce utility', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('delays function execution until wait time elapses', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 500);

    debounced('a');
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(499);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('a');
  });

  test('resets timer on subsequent calls before wait time', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 500);

    debounced('first');
    vi.advanceTimersByTime(300);

    debounced('second');
    vi.advanceTimersByTime(300);

    // only 300ms since last call, should not execute yet
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);

    // now 500ms since last call, should execute with last argument
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('second');
  });

  test('calls function only once for rapid successive calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    // rapid calls
    debounced(1);
    debounced(2);
    debounced(3);
    debounced(4);
    debounced(5);

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(5);
  });

  test('preserves function arguments across multiple calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 200);

    debounced('arg1', 'arg2', 'arg3');
    vi.advanceTimersByTime(200);

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
  });

  test('allows multiple debounced executions after wait time', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('first');
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);

    debounced('second');
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);

    debounced('third');
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  test('works with different wait times', () => {
    const fn = vi.fn();
    const debounced100 = debounce(fn, 100);
    const debounced500 = debounce(fn, 500);

    debounced100('fast');
    debounced500('slow');

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('fast');

    vi.advanceTimersByTime(400);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith('slow');
  });
});
