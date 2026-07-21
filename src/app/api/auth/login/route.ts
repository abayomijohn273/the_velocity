import { withApi, parseBody } from '@/lib/api/handler';
import { success, ApiError } from '@/lib/api/response';
import { loginSchema } from '@/lib/validation/auth';
import { findUserByEmail, toAuthUser } from '@/lib/db/users';
import { verifyPassword } from '@/lib/auth/password';
import { signToken } from '@/lib/auth/jwt';
import { setAuthCookie } from '@/lib/auth/cookies';

export const POST = withApi(async (req) => {
  const { email, password } = await parseBody(req, loginSchema);
  const user = await findUserByEmail(email);

  if (!user || !user.password_hash) {
    throw new ApiError('Invalid email or password.', 401);
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    throw new ApiError('Invalid email or password.', 401);
  }

  if (!user.is_email_verified) {
    throw new ApiError('Please verify your email before logging in.', 403);
  }

  if (user.account_status !== 'approved') {
    throw new ApiError(
      'Your account has not been approved yet. Please reach out to the admin to get approved.',
      403
    );
  }

  const token = await signToken({ sub: user.id, email: user.email, role: user.role });
  await setAuthCookie(token);

  return success({ user: toAuthUser(user) });
});
