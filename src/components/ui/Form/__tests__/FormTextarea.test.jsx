import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormTextarea } from '../..';

describe('FormTextarea component', () => {
  test('renders textarea, displays error, and calls onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onBlur = vi.fn();

    render(
      <FormTextarea
        label="message"
        name="message"
        value="hello"
        error="message is required"
        onChange={onChange}
        onBlur={onBlur}
      />
    );

    const textarea = screen.getByRole('textbox', { name: /message/i });
    expect(textarea).toBeInTheDocument();
    expect(screen.getByText('message is required')).toBeInTheDocument();

    await user.type(textarea, 'lorem');
    expect(onChange).toHaveBeenCalled();
  });

  test('auto-resize logic runs without errors when value changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <FormTextarea label="message" name="message" value={'line\n'.repeat(3)} onChange={onChange} />
    );

    const textarea = screen.getByRole('textbox', { name: /message/i });
    expect(textarea).toBeInTheDocument();

    await user.clear(textarea);
    await user.type(textarea, 'short');
    expect(onChange).toHaveBeenCalled();
  });
});
