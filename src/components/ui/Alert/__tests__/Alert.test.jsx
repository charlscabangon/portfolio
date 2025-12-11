import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Alert } from '../..';

describe('Alert component', () => {
  test('does not render when closed', () => {
    render(<Alert isOpen={false} onClose={vi.fn()} variant="success" title="success" />);

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  test('renders alert with title and message', () => {
    render(
      <Alert
        isOpen
        onClose={vi.fn()}
        variant="success"
        title="success"
        message="lorem ipsum dolor"
      />
    );

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByText('success')).toBeInTheDocument();
    expect(screen.getByText('lorem ipsum dolor')).toBeInTheDocument();
  });

  test('renders different variants', () => {
    const { rerender } = render(
      <Alert isOpen onClose={vi.fn()} variant="success" title="success" />
    );
    expect(screen.getByText('success')).toBeInTheDocument();

    rerender(<Alert isOpen onClose={vi.fn()} variant="error" title="error" />);
    expect(screen.getByText('error')).toBeInTheDocument();
  });

  test('calls onClose when close button clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Alert isOpen onClose={onClose} variant="success" title="success" />);

    await user.click(screen.getByLabelText('Close dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when backdrop clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(
      <Alert isOpen onClose={onClose} variant="success" title="success" />
    );

    const backdrop = container.querySelector('[class*="bg-black"]');
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  test('does not close when dialog content clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Alert isOpen onClose={onClose} variant="success" title="success" />);

    await user.click(screen.getByRole('alertdialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  test('has correct accessibility attributes', () => {
    render(
      <Alert
        isOpen
        onClose={vi.fn()}
        variant="success"
        title="success"
        message="lorem ipsum dolor"
      />
    );

    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'dialog-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'dialog-description');
  });
});
