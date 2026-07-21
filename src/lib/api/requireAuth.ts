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

/** Use inside admin-only API routes; throws a 403 when the caller isn't an admin. */
export const requireAdmin = async (): Promise<AuthUser> => {
  const user = await requireAuth();
  if (user.role !== 'admin') {
    throw new ApiError('You do not have permission to access this resource.', 403);
  }
  return user;
};
