import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { ApiClientError } from './client';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiClientError) return error.message;
  if (error instanceof Error) return error.message;
  return 'Something went wrong. Please try again.';
};

/** Maps server-side field errors onto a react-hook-form instance. */
export const applyApiFieldErrors = <T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>
): void => {
  if (error instanceof ApiClientError && error.fieldErrors) {
    for (const [field, message] of Object.entries(error.fieldErrors)) {
      setError(field as Path<T>, { type: 'server', message });
    }
  }
};
