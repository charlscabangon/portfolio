import { saveFormData, loadFormData, clearFormData } from '../utils/storage';
import { STORAGE_KEY, INITIAL_FORM_STATE } from '../utils/constants';
import { formData } from './mocks/formData';

describe('storage utilities', () => {
  describe('saveFormData', () => {
    test('saves form data to localStorage as JSON', () => {
      saveFormData(formData);

      const raw = localStorage.getItem(STORAGE_KEY);
      expect(raw).toBeTruthy();

      const parsed = JSON.parse(raw);
      expect(parsed).toEqual(formData);
    });

    test('handles localStorage write errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const error = new Error('QuotaExceededError');

      vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
        throw error;
      });

      saveFormData(formData);

      expect(consoleSpy).toHaveBeenCalledWith('Failed to save form data to localStorage:', error);

      consoleSpy.mockRestore();
    });
  });

  describe('loadFormData', () => {
    test('returns INITIAL_FORM_STATE when localStorage is empty', () => {
      expect(loadFormData()).toEqual(INITIAL_FORM_STATE);
    });

    test('returns parsed form data when present in localStorage', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

      expect(loadFormData()).toEqual(formData);
    });

    test('sanitizes loaded data with fallback empty strings', () => {
      const incompleteData = { name: 'Charls' };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(incompleteData));

      const result = loadFormData();

      expect(result.name).toBe('Charls');
      expect(result.email).toBe('');
      expect(result.message).toBe('');
    });

    test('returns INITIAL_FORM_STATE on JSON parse error', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorage.setItem(STORAGE_KEY, 'invalid-json{');

      const result = loadFormData();

      expect(result).toEqual(INITIAL_FORM_STATE);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    test('returns INITIAL_FORM_STATE on localStorage read error', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const error = new Error('localStorage not available');

      vi.spyOn(Storage.prototype, 'getItem').mockImplementationOnce(() => {
        throw error;
      });

      const result = loadFormData();

      expect(result).toEqual(INITIAL_FORM_STATE);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('clearFormData', () => {
    test('removes form data from localStorage', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

      clearFormData();

      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });

    test('handles localStorage remove errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const error = new Error('localStorage error');

      vi.spyOn(Storage.prototype, 'removeItem').mockImplementationOnce(() => {
        throw error;
      });

      clearFormData();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to clear form data from localStorage:',
        error
      );

      consoleSpy.mockRestore();
    });
  });
});
