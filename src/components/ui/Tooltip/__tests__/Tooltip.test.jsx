import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tooltip from '../Tooltip';

describe('Tooltip component', () => {
  test('renders children and tooltip content', () => {
    render(
      <Tooltip content="tooltip content">
        <button>hover me</button>
      </Tooltip>
    );

    expect(screen.getByRole('button', { name: /hover me/i })).toBeInTheDocument();
    expect(screen.getByText('tooltip content')).toBeInTheDocument();
  });

  test('shows tooltip on hover and hides on unhover', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="tooltip content" delay={0}>
        <button>hover me</button>
      </Tooltip>
    );

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveClass('invisible');

    await user.hover(screen.getByRole('button'));
    await waitFor(() => expect(tooltip).toHaveClass('visible'));

    await user.unhover(screen.getByRole('button'));
    await waitFor(() => expect(tooltip).toHaveClass('invisible'));
  });

  test('shows tooltip on focus and hides on blur', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Tooltip content="tooltip content" delay={0}>
          <button>Focus me</button>
        </Tooltip>
        <button>Other button</button>
      </>
    );

    const tooltip = screen.getByRole('tooltip');

    await user.tab();
    await waitFor(() => expect(tooltip).toHaveClass('visible'));

    await user.tab();
    await waitFor(() => expect(tooltip).toHaveClass('invisible'));
  });

  test('does not show tooltip when disabled', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="tooltip content" disabled delay={0}>
        <button>hover me</button>
      </Tooltip>
    );

    await user.hover(screen.getByRole('button'));
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(screen.getByRole('tooltip')).toHaveClass('invisible');
  });
});
