import 'server-only';
import { cookies } from 'next/headers';
import { AUTH_COOKIE } from '@/lib/auth/cookies';
import { verifyToken } from '@/lib/auth/jwt';
import { findUserById, toAuthUser } from '@/lib/db/users';
import type { AuthUser } from '@/types/user';

/**
 * Resolves the current user from the auth cookie.
 * Returns null when there is no valid (non-expired) session.
 */
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const store = await cookies();
  const token = store.get(AUTH_COOKIE)?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  const user = await findUserById(payload.sub);
  return user ? toAuthUser(user) : null;
};
