import { withApi, parseBody } from '@/lib/api/handler';
import { success, ApiError } from '@/lib/api/response';
import { setPasswordSchema } from '@/lib/validation/auth';
import { verifyActionToken } from '@/lib/auth/actionToken';
import { hashPassword } from '@/lib/auth/password';
import { updateUser } from '@/lib/db/users';

/** Existing member sets their password after member_activation verification. */
export const POST = withApi(async (req) => {
  const { token, password } = await parseBody(req, setPasswordSchema);
  const payload = await verifyActionToken(token, 'member_activation');
  if (!payload) {
    throw new ApiError('This link has expired. Please verify your email again.', 401);
  }

  const passwordHash = await hashPassword(password);
  await updateUser(payload.sub, { password_hash: passwordHash, is_email_verified: true });

  return success({ completed: true });
});
