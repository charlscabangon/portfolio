import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ContactForm } from '..';
import { EMAIL_SUCCESS, EMAIL_ERROR } from '../utils/constants';
import { formData } from './mocks/formData';

vi.mock('../services/emailService', () => ({
  emailService: {
    sendContactEmail: vi.fn(),
  },
}));

import { emailService } from '../services/emailService';

describe('ContactForm integration', () => {
  test('submitting empty form shows validation errors', async () => {
    const user = userEvent.setup();

    render(<ContactForm />);

    const submit = screen.getByRole('button', { name: /send message/i });
    await user.click(submit);

    expect(await screen.findByText('name is required')).toBeInTheDocument();
    expect(screen.getByText('email is required')).toBeInTheDocument();
    expect(screen.getByText('message is required')).toBeInTheDocument();

    expect(emailService.sendContactEmail).not.toHaveBeenCalled();
  });

  test('successful submission calls service and shows success alert', async () => {
    const user = userEvent.setup();
    emailService.sendContactEmail.mockResolvedValueOnce({ success: true, status: 200, text: 'OK' });

    render(<ContactForm />);

    await user.type(screen.getByRole('textbox', { name: /name/i }), formData.name);
    await user.type(screen.getByRole('textbox', { name: /email/i }), formData.email);
    await user.type(screen.getByRole('textbox', { name: /message/i }), formData.message);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await screen.findByText(EMAIL_SUCCESS.title);

    expect(emailService.sendContactEmail).toHaveBeenCalledTimes(1);

    expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: /message/i })).toHaveValue('');
  });

  test('unsuccessful submission returns friendly error and shows error alert', async () => {
    const user = userEvent.setup();
    emailService.sendContactEmail.mockResolvedValueOnce({
      success: false,
      error: 'too many requests',
    });

    render(<ContactForm />);

    await user.type(screen.getByRole('textbox', { name: /name/i }), formData.name);
    await user.type(screen.getByRole('textbox', { name: /email/i }), formData.email);
    await user.type(screen.getByRole('textbox', { name: /message/i }), formData.message);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    const dialog = await screen.findByRole('alertdialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/too many requests/i)).toBeInTheDocument();
  });

  test('network or unexpected exception results in fallback error message', async () => {
    const user = userEvent.setup();
    emailService.sendContactEmail.mockRejectedValueOnce(new Error('network failure'));

    render(<ContactForm />);

    await user.type(screen.getByRole('textbox', { name: /name/i }), formData.name);
    await user.type(screen.getByRole('textbox', { name: /email/i }), formData.email);
    await user.type(screen.getByRole('textbox', { name: /message/i }), formData.message);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    const dialog = await screen.findByRole('alertdialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/an unexpected error occurred/i)).toBeInTheDocument();
    expect(emailService.sendContactEmail).toHaveBeenCalled();
  });

  test('invalid email prevents service call and shows validation message', async () => {
    const user = userEvent.setup();

    render(<ContactForm />);

    await user.type(screen.getByRole('textbox', { name: /name/i }), formData.name);
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'not-an-email');
    await user.type(screen.getByRole('textbox', { name: /message/i }), formData.message);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText('please enter a valid email address')).toBeInTheDocument();
    expect(emailService.sendContactEmail).not.toHaveBeenCalled();
  });
});
