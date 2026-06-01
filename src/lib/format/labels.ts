import { countries } from '@/lib/constants/countries';
import { currentRoles, type SelectOption } from '@/lib/constants/currentRoles';
import { industries } from '@/lib/constants/industries';

const labelFrom = (options: SelectOption[], value: string): string | undefined =>
  options.find((option) => option.value === value)?.label;

/** Turns an unknown raw value like "human_resources" into "Human Resources". */
const prettify = (value: string): string =>
  value.replace(/[_-]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

export const getRoleLabel = (value?: string | null): string =>
  value ? (labelFrom(currentRoles, value) ?? prettify(value)) : '';

export const getIndustryLabel = (value?: string | null): string =>
  value ? (labelFrom(industries, value) ?? prettify(value)) : '';

export const getCountryName = (value?: string | null): string =>
  value ? (labelFrom(countries, value) ?? value) : '';

/** True when the stored country value is a 2-letter ISO code (renderable as a flag). */
export const isCountryCode = (value?: string | null): value is string =>
  !!value && /^[A-Z]{2}$/.test(value);
