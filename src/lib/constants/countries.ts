import labels from 'react-phone-number-input/locale/en.json';
import type { SelectOption } from './currentRoles';

/**
 * Country options derived from react-phone-number-input's locale data so we
 * don't maintain a hand-written list. Value = ISO code, label = country name.
 */
export const countries: SelectOption[] = Object.entries(labels)
  .filter(([code, name]) => /^[A-Z]{2}$/.test(code) && typeof name === 'string')
  .map(([code, name]) => ({ value: code, label: name as string }))
  .sort((a, b) => a.label.localeCompare(b.label));
