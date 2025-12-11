import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const fillForm = async (user, data = formData) => {
    await user.type(screen.getByRole('textbox', { name: /name/i }), data.name);
    await user.type(screen.getByRole('textbox', { name: /email/i }), data.email);
    await user.type(screen.getByRole('textbox', { name: /message/i }), data.message);
  };

  const submitForm = async (user) => {
    await user.click(screen.getByRole('button', { name: /send message/i }));
  };

  describe('form validation', () => {
    test('shows all validation errors when submitting empty form', async () => {
      const user = userEvent.setup();

      render(<ContactForm />);

      await submitForm(user);

      expect(await screen.findByText('name is required')).toBeInTheDocument();
      expect(screen.getByText('email is required')).toBeInTheDocument();
      expect(screen.getByText('message is required')).toBeInTheDocument();
      expect(emailService.sendContactEmail).not.toHaveBeenCalled();
    });

    test('shows validation error for invalid email format', async () => {
      const user = userEvent.setup();

      render(<ContactForm />);

      await fillForm(user, { ...formData, email: 'invalid-email' });
      await submitForm(user);

      expect(await screen.findByText('please enter a valid email address')).toBeInTheDocument();
      expect(emailService.sendContactEmail).not.toHaveBeenCalled();
    });

    test('shows validation error for short name', async () => {
      const user = userEvent.setup();

      render(<ContactForm />);

      await fillForm(user, { ...formData, name: 'A' });
      await submitForm(user);

      expect(await screen.findByText('name must be at least 2 characters')).toBeInTheDocument();
      expect(emailService.sendContactEmail).not.toHaveBeenCalled();
    });

    test('shows validation error for short message', async () => {
      const user = userEvent.setup();

      render(<ContactForm />);

      await fillForm(user, { ...formData, message: 'short' });
      await submitForm(user);

      expect(await screen.findByText('message must be at least 10 characters')).toBeInTheDocument();
      expect(emailService.sendContactEmail).not.toHaveBeenCalled();
    });
  });

  describe('successful submission', () => {
    test('calls email service with form data and shows success alert', async () => {
      const user = userEvent.setup();
      emailService.sendContactEmail.mockResolvedValueOnce({
        success: true,
        status: 200,
        text: 'OK',
      });

      render(<ContactForm />);

      await fillForm(user);
      await submitForm(user);

      expect(emailService.sendContactEmail).toHaveBeenCalledTimes(1);
      expect(emailService.sendContactEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        })
      );

      expect(await screen.findByText(EMAIL_SUCCESS.title)).toBeInTheDocument();
      expect(screen.getByText(EMAIL_SUCCESS.message)).toBeInTheDocument();
    });

    test('clears form fields after successful submission', async () => {
      const user = userEvent.setup();
      emailService.sendContactEmail.mockResolvedValueOnce({
        success: true,
        status: 200,
        text: 'OK',
      });

      render(<ContactForm />);

      await fillForm(user);
      await submitForm(user);

      await screen.findByText(EMAIL_SUCCESS.title);

      expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue('');
      expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('');
      expect(screen.getByRole('textbox', { name: /message/i })).toHaveValue('');
    });

    test('disables submit button and shows loading state while sending', async () => {
      const user = userEvent.setup();
      let resolveEmail;
      emailService.sendContactEmail.mockReturnValueOnce(
        new Promise((resolve) => {
          resolveEmail = resolve;
        })
      );

      render(<ContactForm />);

      await fillForm(user);
      await submitForm(user);

      const submitButton = screen.getByRole('button', { name: /sending/i });
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveAttribute('aria-busy', 'true');
      expect(screen.getByText('sending...')).toBeInTheDocument();

      resolveEmail({ success: true, status: 200, text: 'OK' });

      await screen.findByText(EMAIL_SUCCESS.title);
    });
  });

  describe('failed submission', () => {
    test('shows error alert with specific error message from service', async () => {
      const user = userEvent.setup();
      const errorMessage = 'too many requests';
      emailService.sendContactEmail.mockResolvedValueOnce({
        success: false,
        error: errorMessage,
      });

      render(<ContactForm />);

      await fillForm(user);
      await submitForm(user);

      const dialog = await screen.findByRole('alertdialog');
      expect(dialog).toBeInTheDocument();

      expect(within(dialog).getByText(EMAIL_ERROR.title)).toBeInTheDocument();
      expect(within(dialog).getByText(new RegExp(errorMessage, 'i'))).toBeInTheDocument();
    });

    test('shows fallback error message on network failure', async () => {
      const user = userEvent.setup();
      emailService.sendContactEmail.mockRejectedValueOnce(new Error('network failure'));

      render(<ContactForm />);

      await fillForm(user);
      await submitForm(user);

      const dialog = await screen.findByRole('alertdialog');
      expect(dialog).toBeInTheDocument();

      expect(within(dialog).getByText(EMAIL_ERROR.title)).toBeInTheDocument();
      expect(within(dialog).getByText(/an unexpected error occurred/i)).toBeInTheDocument();
      expect(emailService.sendContactEmail).toHaveBeenCalledTimes(1);
    });

    test('shows fallback error message on unexpected exception', async () => {
      const user = userEvent.setup();
      emailService.sendContactEmail.mockRejectedValueOnce(new Error('unexpected error'));

      render(<ContactForm />);

      await fillForm(user);
      await submitForm(user);

      const dialog = await screen.findByRole('alertdialog');
      expect(within(dialog).getByText(/an unexpected error occurred/i)).toBeInTheDocument();
    });

    test('allows form resubmission after error', async () => {
      const user = userEvent.setup();
      emailService.sendContactEmail.mockRejectedValueOnce(new Error('first error'));

      render(<ContactForm />);

      await fillForm(user);
      await submitForm(user);

      const dialog = await screen.findByRole('alertdialog');

      const closeButton = within(dialog).getByRole('button', { name: /close dialog/i });
      await user.click(closeButton);

      await vi.waitFor(
        () => {
          expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
        },
        { timeout: 500 }
      );

      emailService.sendContactEmail.mockResolvedValueOnce({
        success: true,
        status: 200,
        text: 'OK',
      });

      await fillForm(user);
      await submitForm(user);

      const successDialog = await screen.findByRole('alertdialog');
      expect(within(successDialog).getByText(EMAIL_SUCCESS.title)).toBeInTheDocument();
      expect(emailService.sendContactEmail).toHaveBeenCalledTimes(2);
    });
  });

  describe('form behavior', () => {
    test('clear all button resets form fields', async () => {
      const user = userEvent.setup();

      render(<ContactForm />);

      await fillForm(user);

      const clearButton = screen.getByRole('button', { name: /clear all/i });
      await user.click(clearButton);

      expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue('');
      expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('');
      expect(screen.getByRole('textbox', { name: /message/i })).toHaveValue('');
    });

    test('closes success dialog when close button is clicked', async () => {
      const user = userEvent.setup();
      emailService.sendContactEmail.mockResolvedValueOnce({
        success: true,
        status: 200,
        text: 'OK',
      });

      render(<ContactForm />);

      await fillForm(user);
      await submitForm(user);

      const dialog = await screen.findByRole('alertdialog');
      const closeButton = within(dialog).getByRole('button');

      await user.click(closeButton);

      await vi.waitFor(
        () => {
          expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
        },
        { timeout: 500 }
      );
    });

    test('validates fields on blur', async () => {
      const user = userEvent.setup();

      render(<ContactForm />);

      const emailInput = screen.getByRole('textbox', { name: /email/i });

      await user.type(emailInput, 'invalid');
      await user.tab();

      expect(await screen.findByText('please enter a valid email address')).toBeInTheDocument();
    });
  });
});
