import { withApi, parseBody } from '@/lib/api/handler';
import { success, ApiError } from '@/lib/api/response';
import { setPasswordSchema } from '@/lib/validation/auth';
import { verifyActionToken } from '@/lib/auth/actionToken';
import { hashPassword } from '@/lib/auth/password';
import { updateUser } from '@/lib/db/users';

export const POST = withApi(async (req) => {
  const { token, password } = await parseBody(req, setPasswordSchema);
  const payload = await verifyActionToken(token, 'password_reset');
  if (!payload) {
    throw new ApiError('This reset link has expired. Please start over.', 401);
  }

  const passwordHash = await hashPassword(password);
  await updateUser(payload.sub, { password_hash: passwordHash });

  return success({ reset: true });
});
