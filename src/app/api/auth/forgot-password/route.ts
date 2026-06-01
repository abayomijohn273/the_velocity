import { withApi, parseBody } from '@/lib/api/handler';
import { success } from '@/lib/api/response';
import { emailOnlySchema } from '@/lib/validation/auth';
import { findUserByEmail } from '@/lib/db/users';
import { issueOtp } from '@/lib/auth/otpService';

export const POST = withApi(async (req) => {
  const { email } = await parseBody(req, emailOnlySchema);
  const user = await findUserByEmail(email);

  // Respond uniformly whether or not the email exists (no account enumeration).
  if (user) {
    await issueOtp(user.id, user.email, 'password_reset');
  }

  return success({ sent: true });
});
