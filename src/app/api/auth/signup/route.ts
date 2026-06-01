import { withApi, parseBody } from '@/lib/api/handler';
import { success, ApiError } from '@/lib/api/response';
import { signupSchema } from '@/lib/validation/auth';
import { createUser, findUserByEmail, updateUser } from '@/lib/db/users';
import { hashPassword } from '@/lib/auth/password';
import { issueOtp } from '@/lib/auth/otpService';

export const POST = withApi(async (req) => {
  const { email, password } = await parseBody(req, signupSchema);
  const existing = await findUserByEmail(email);

  if (existing?.is_email_verified) {
    throw new ApiError('An account with this email already exists. Please log in.', 409);
  }

  const passwordHash = await hashPassword(password);
  const user = existing
    ? await updateUser(existing.id, { password_hash: passwordHash })
    : await createUser({ email, passwordHash });

  await issueOtp(user.id, user.email, 'email_verification');

  return success({ email: user.email }, 201);
});
