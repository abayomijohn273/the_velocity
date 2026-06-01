import 'server-only';
import { getCurrentUser } from '@/lib/auth/session';
import { ApiError } from './response';
import type { AuthUser } from '@/types/user';

/** Use inside protected API routes; throws a 401 when there is no valid session. */
export const requireAuth = async (): Promise<AuthUser> => {
  const user = await getCurrentUser();
  if (!user) {
    throw new ApiError('Your session has expired. Please log in again.', 401);
  }
  return user;
};
