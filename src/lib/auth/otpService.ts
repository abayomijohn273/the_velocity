import 'server-only';
import { generateOtp, hashOtp, OTP_MAX_ATTEMPTS } from '@/lib/auth/otp';
import { consumeOtp, findActiveOtp, incrementOtpAttempts, replaceOtp } from '@/lib/db/otpCodes';
import { sendOtpEmail } from '@/lib/email/send';
import { ApiError } from '@/lib/api/response';
import type { OtpPurpose } from '@/types/user';

/** Generates, stores (hashed) and emails a fresh OTP for the given user/purpose. */
export const issueOtp = async (
  userId: string,
  email: string,
  purpose: OtpPurpose
): Promise<void> => {
  const code = generateOtp();
  await replaceOtp(userId, purpose, code);
  await sendOtpEmail(email, code, purpose);
};

/** Validates a submitted code, enforcing expiry + attempt limits, then consumes it. */
export const verifyOtp = async (
  userId: string,
  purpose: OtpPurpose,
  code: string
): Promise<void> => {
  const record = await findActiveOtp(userId, purpose);
  if (!record) {
    throw new ApiError('No active code found. Please request a new one.', 400);
  }
  if (new Date(record.expires_at).getTime() < Date.now()) {
    throw new ApiError('This code has expired. Please request a new one.', 400);
  }
  if (record.attempts >= OTP_MAX_ATTEMPTS) {
    throw new ApiError('Too many incorrect attempts. Please request a new code.', 429);
  }
  if (record.code_hash !== hashOtp(code)) {
    await incrementOtpAttempts(record.id, record.attempts);
    throw new ApiError('Incorrect code. Please try again.', 400);
  }
  await consumeOtp(record.id);
};
