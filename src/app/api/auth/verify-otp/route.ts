import { withApi, parseBody } from '@/lib/api/handler';
import { success, ApiError } from '@/lib/api/response';
import { verifyOtpSchema } from '@/lib/validation/auth';
import { findUserByEmail, updateUser } from '@/lib/db/users';
import { verifyOtp } from '@/lib/auth/otpService';
import { signActionToken } from '@/lib/auth/actionToken';
import { sendAdminNewSignupEmail, sendSignupSuccessEmail } from '@/lib/email/send';

export const POST = withApi(async (req) => {
  const { email, purpose, code } = await parseBody(req, verifyOtpSchema);
  const user = await findUserByEmail(email);
  if (!user) {
    throw new ApiError('No account found for this email.', 404);
  }

  await verifyOtp(user.id, purpose, code);

  if (purpose === 'email_verification') {
    await updateUser(user.id, { is_email_verified: true });
    // Notifications must never block a successful verification.
    try {
      await Promise.all([sendSignupSuccessEmail(user.email), sendAdminNewSignupEmail(user.email)]);
    } catch (error) {
      console.error('[verify-otp] notification email failed:', error);
    }
    return success({ verified: true });
  }

  // member_activation | password_reset → hand back a short-lived token to set a password.
  const actionToken = await signActionToken({ sub: user.id, purpose });
  return success({ verified: true, actionToken });
});
