import { debounce } from '../utils/debounce';

describe('debounce utility', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('debounce delays execution until wait time', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 500);

    debounced('a');
    expect(fn).not.toBeCalled();

    // advance time less than wait -> still not called
    vi.advanceTimersByTime(200);
    expect(fn).not.toBeCalled();

    // advance remaining time -> called once
    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('a');

    // calling repeatedly resets timer
    debounced(1);
    vi.advanceTimersByTime(300);
    debounced(2);
    vi.advanceTimersByTime(300);
    // now 600 total since last call, should have called once for last argument
    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
