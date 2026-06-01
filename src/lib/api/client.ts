import { routes } from '@/lib/constants/routes';

export class ApiClientError extends Error {
  status: number;
  fieldErrors?: Record<string, string>;
  constructor(message: string, status: number, fieldErrors?: Record<string, string>) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string>;
}

/**
 * Thin fetch wrapper for the app's JSON API. Sends cookies, unwraps the
 * { success, data } envelope, and throws a typed error on failure.
 * A 401 means the 7-day session expired → bounce to login automatically.
 */
export const apiFetch = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const res = await fetch(path, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });

  let body: ApiEnvelope<T> | null = null;
  try {
    body = (await res.json()) as ApiEnvelope<T>;
  } catch {
    body = null;
  }

  if (!res.ok || !body?.success) {
    if (res.status === 401 && typeof window !== 'undefined') {
      const onAuthPage = window.location.pathname.startsWith('/login');
      if (!onAuthPage) window.location.assign(routes.login);
    }
    throw new ApiClientError(
      body?.message ?? 'Something went wrong. Please try again.',
      res.status,
      body?.errors
    );
  }

  return body.data as T;
};
