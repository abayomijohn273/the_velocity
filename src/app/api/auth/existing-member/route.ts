import { parseBody, withApi } from '@/lib/api/handler';
import { ApiError, success } from '@/lib/api/response';
import { issueOtp } from '@/lib/auth/otpService';
import { findUserByEmail } from '@/lib/db/users';
import { emailOnlySchema } from '@/lib/validation/auth';

/** Existing members verify ownership of their email before setting a password. */
export const POST = withApi(async (req) => {
  const { email } = await parseBody(req, emailOnlySchema);
  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError('We couldn’t find a member with this email.', 404);
  }

  if (user.is_email_verified && user.password_hash) {
    throw new ApiError('Your account is already verified. Please log in instead.', 409);
  }

  await issueOtp(user.id, user.email, 'member_activation');
  return success({ email: user.email });
});
