import { withApi, parseBody } from '@/lib/api/handler';
import { success } from '@/lib/api/response';
import { resendOtpSchema } from '@/lib/validation/auth';
import { findUserByEmail } from '@/lib/db/users';
import { issueOtp } from '@/lib/auth/otpService';

export const POST = withApi(async (req) => {
  const { email, purpose } = await parseBody(req, resendOtpSchema);
  const user = await findUserByEmail(email);

  // Re-issue only when the user exists; respond uniformly to avoid enumeration.
  if (user) {
    await issueOtp(user.id, user.email, purpose);
  }

  return success({ sent: true });
});
