import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormTextarea } from '../..';

describe('FormTextarea component', () => {
  test('renders textarea, displays error, and handles user input', async () => {
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

    await user.type(textarea, 'lorem ipsum');
    expect(onChange).toHaveBeenCalled();

    await user.tab();
    expect(onBlur).toHaveBeenCalled();
  });
});
