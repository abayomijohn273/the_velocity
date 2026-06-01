/** Shared input shell styles so every form control looks identical (DRY). */
export const inputBaseClass = (hasError?: boolean): string =>
  [
    'w-full rounded-lg border bg-white px-4 py-3 text-sm text-black outline-none transition',
    'placeholder:text-gray-400',
    hasError
      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20',
  ].join(' ');
