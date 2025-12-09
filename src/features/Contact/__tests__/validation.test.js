import {
  validateName,
  validateEmail,
  validateMessage,
  validateField,
  validateContactForm,
} from '../utils/validation';
import { formData } from './mocks/formData';

describe('contact validation utilities', () => {
  test('validateName validates and invalidates names', () => {
    expect(validateName('A')).toBe(false);
    expect(validateName('Ab')).toBe(true);
    expect(validateName('  Ab  ')).toBe(true);
    expect(validateName(formData.name)).toBe(true);
  });

  test('validateEmail validates and invalidates emails', () => {
    expect(validateEmail('not-an-email')).toBe(false);
    expect(validateEmail('a@b')).toBe(false);
    expect(validateEmail(formData.email)).toBe(true);
  });

  test('validateMessage length constraints', () => {
    expect(validateMessage('lorem')).toBe(false);
    expect(validateMessage(formData.message)).toBe(true);
  });

  test('validateField returns appropriate error messages', () => {
    expect(validateField('name', '')).toBe('name is required');
    expect(validateField('name', 'A')).toBe('name must be at least 2 characters');
    expect(validateField('email', '')).toBe('email is required');
    expect(validateField('email', 'not')).toBe('please enter a valid email address');
    expect(validateField('message', '')).toBe('message is required');
    expect(validateField('message', 'lorem')).toBe('message must be at least 10 characters');

    expect(validateField('name', formData.name)).toBeNull();
    expect(validateField('email', formData.email)).toBeNull();
    expect(validateField('message', formData.message)).toBeNull();
  });

  test('validateContactForm collects all errors and validity', () => {
    const emptyForm = { name: '', email: '', message: '' };
    const form1 = validateContactForm(emptyForm);
    expect(form1.isValid).toBe(false);
    expect(form1.errors).toHaveProperty('name');
    expect(form1.errors).toHaveProperty('email');
    expect(form1.errors).toHaveProperty('message');

    const form2 = validateContactForm(formData);
    expect(form2.isValid).toBe(true);
    expect(form2.errors).toEqual({});
  });
});
