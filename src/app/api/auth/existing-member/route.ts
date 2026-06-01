import { withApi, parseBody } from '@/lib/api/handler';
import { success, ApiError } from '@/lib/api/response';
import { emailOnlySchema } from '@/lib/validation/auth';
import { findUserByEmail } from '@/lib/db/users';
import { issueOtp } from '@/lib/auth/otpService';

/** Existing members verify ownership of their email before setting a password. */
export const POST = withApi(async (req) => {
  const { email } = await parseBody(req, emailOnlySchema);
  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError('We couldn’t find a member with this email.', 404);
  }

  await issueOtp(user.id, user.email, 'member_activation');
  return success({ email: user.email });
});
