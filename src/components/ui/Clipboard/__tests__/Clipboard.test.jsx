import { screen, render, waitFor, fireEvent } from '@testing-library/react';

import Clipboard from '../Clipboard';

vi.mock('../../Tooltip', () => ({
  default: ({ children }) => children,
}));

describe('Clipboard component', () => {
  let mockWriteText;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);

    // clipboard mock
    global.navigator.clipboard = {
      writeText: mockWriteText,
    };
  });

  test('copies text to clipboard on button click', async () => {
    render(<Clipboard text="lorem ipsum" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith('lorem ipsum');
    });
    expect(mockWriteText).toHaveBeenCalledTimes(1);
  });

  test('calls onCopy callback with copied text', async () => {
    const onCopy = vi.fn();

    render(<Clipboard text="lorem ipsum" onCopy={onCopy} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(onCopy).toHaveBeenCalledWith('lorem ipsum');
    });
    expect(onCopy).toHaveBeenCalledTimes(1);
  });

  test('handles clipboard errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const copyError = new Error('Clipboard access denied');

    mockWriteText.mockRejectedValueOnce(copyError);

    render(<Clipboard text="lorem" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('Failed to copy:', copyError);
    });

    consoleSpy.mockRestore();
  });

  test('supports multiple copy operations', async () => {
    render(<Clipboard text="lorem" />);

    const button = screen.getByRole('button');

    fireEvent.click(button);
    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(button);
    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledTimes(2);
    });
  });

  test('renders children when provided', () => {
    render(
      <Clipboard text="copy me">
        <span>click to copy</span>
      </Clipboard>
    );

    expect(screen.getByText('click to copy')).toBeInTheDocument();
  });
});
