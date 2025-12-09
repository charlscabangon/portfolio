import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormInput } from '../..';

describe('FormInput component', () => {
  test('renders label, displays error, and calls onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onBlur = vi.fn();

    render(
      <FormInput
        label="name"
        name="name"
        value=""
        error="name is required"
        onChange={onChange}
        onBlur={onBlur}
      />
    );

    const input = screen.getByRole('textbox', { name: /name/i });
    expect(input).toBeInTheDocument();
    expect(screen.getByText('name is required')).toBeInTheDocument();

    await user.type(input, 'lorem');
    expect(onChange).toHaveBeenCalled();

    await user.tab();
    expect(onBlur).toHaveBeenCalled();

    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('disabled input is non-interactive', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <FormInput label="email" name="email" value="lorem@.com" disabled onChange={onChange} />
    );

    const input = screen.getByRole('textbox', { name: /email/i });
    expect(input).toBeDisabled();

    await user.type(input, 'x');
    expect(onChange).not.toHaveBeenCalled();
  });
});
