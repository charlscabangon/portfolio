import { saveFormData, loadFormData, clearFormData } from '../utils/storage';
import { STORAGE_KEY, INITIAL_FORM_STATE } from '../utils/constants';
import { formData } from './mocks/formData';

describe('storage utilities', () => {
  test('saveFormData writes JSON to localStorage', () => {
    saveFormData(formData);
    const raw = localStorage.getItem(STORAGE_KEY);
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw);
    expect(parsed.name).toBe(formData.name);
  });

  test('loadFormData returns INITIAL_FORM_STATE if empty', () => {
    expect(loadFormData()).toEqual(INITIAL_FORM_STATE);
  });

  test('loadFormData returns parsed data when present', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    expect(loadFormData()).toEqual(formData);
  });

  test('clearFormData removes storage key', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    clearFormData();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
