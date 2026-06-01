import 'server-only';
import { cookies } from 'next/headers';
import { TOKEN_TTL_SECONDS } from '@/lib/config/env';

export const AUTH_COOKIE = 'velocity_token';

const isProduction = process.env.NODE_ENV === 'production';

export const setAuthCookie = async (token: string): Promise<void> => {
  const store = await cookies();
  store.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: TOKEN_TTL_SECONDS,
  });
};

export const clearAuthCookie = async (): Promise<void> => {
  const store = await cookies();
  store.set(AUTH_COOKIE, '', {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
};
