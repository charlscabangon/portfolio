import {
  validateName,
  validateEmail,
  validateMessage,
  validateField,
  validateContactForm,
} from '../utils/validation';
import { formData } from './mocks/formData';

describe('contact validation utilities', () => {
  describe('validateName', () => {
    test('rejects names shorter than 2 characters', () => {
      expect(validateName('A')).toBe(false);
      expect(validateName('')).toBe(false);
    });

    test('accepts names with 2 or more characters', () => {
      expect(validateName('Ab')).toBe(true);
      expect(validateName(formData.name)).toBe(true);
    });

    test('trims whitespace before validation', () => {
      expect(validateName('  Ab  ')).toBe(true);
      expect(validateName('   A   ')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    test('rejects invalid email formats', () => {
      expect(validateEmail('not-an-email')).toBe(false);
      expect(validateEmail('a@b')).toBe(false);
      expect(validateEmail('missing@domain')).toBe(false);
      expect(validateEmail('@nodomain.com')).toBe(false);
    });

    test('accepts valid email format', () => {
      expect(validateEmail(formData.email)).toBe(true);
      expect(validateEmail('user@example.com')).toBe(true);
    });
  });

  describe('validateMessage', () => {
    test('rejects messages shorter than 10 characters', () => {
      expect(validateMessage('lorem')).toBe(false);
      expect(validateMessage('short')).toBe(false);
    });

    test('accepts messages with 10 or more characters', () => {
      expect(validateMessage(formData.message)).toBe(true);
      expect(validateMessage('this is a valid message')).toBe(true);
    });
  });

  describe('validateField', () => {
    describe('name field', () => {
      test('returns error for empty name', () => {
        expect(validateField('name', '')).toBe('name is required');
      });

      test('returns error for name shorter than 2 characters', () => {
        expect(validateField('name', 'A')).toBe('name must be at least 2 characters');
      });

      test('returns null for valid name', () => {
        expect(validateField('name', formData.name)).toBeNull();
        expect(validateField('name', 'John Doe')).toBeNull();
      });
    });

    describe('email field', () => {
      test('returns error for empty email', () => {
        expect(validateField('email', '')).toBe('email is required');
      });

      test('returns error for invalid email format', () => {
        expect(validateField('email', 'not')).toBe('please enter a valid email address');
        expect(validateField('email', 'invalid@')).toBe('please enter a valid email address');
      });

      test('returns null for valid email', () => {
        expect(validateField('email', formData.email)).toBeNull();
        expect(validateField('email', 'test@example.com')).toBeNull();
      });
    });

    describe('message field', () => {
      test('returns error for empty message', () => {
        expect(validateField('message', '')).toBe('message is required');
      });

      test('returns error for message shorter than 10 characters', () => {
        expect(validateField('message', 'lorem')).toBe('message must be at least 10 characters');
      });

      test('returns null for valid message', () => {
        expect(validateField('message', formData.message)).toBeNull();
        expect(validateField('message', 'This is a valid message')).toBeNull();
      });
    });

    test('returns null for unknown field names', () => {
      expect(validateField('unknown', 'value')).toBeNull();
    });
  });

  describe('validateContactForm', () => {
    test('returns invalid with all field errors for empty form', () => {
      const emptyForm = { name: '', email: '', message: '' };
      const result = validateContactForm(emptyForm);

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveProperty('name', 'name is required');
      expect(result.errors).toHaveProperty('email', 'email is required');
      expect(result.errors).toHaveProperty('message', 'message is required');
    });

    test('returns invalid with specific field errors for partially invalid form', () => {
      const partialForm = { name: 'A', email: 'invalid', message: 'short' };
      const result = validateContactForm(partialForm);

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveProperty('name');
      expect(result.errors).toHaveProperty('email');
      expect(result.errors).toHaveProperty('message');
    });

    test('returns valid with no errors for completely valid form', () => {
      const result = validateContactForm(formData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });
  });
});
