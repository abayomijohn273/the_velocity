import 'server-only';
import { createHash, randomInt } from 'crypto';

/** Window an OTP code stays valid for. */
export const OTP_TTL_MINUTES = 10;
/** Max verification attempts before a code is locked. */
export const OTP_MAX_ATTEMPTS = 5;

/** Generates a cryptographically-random 6-digit code. */
export const generateOtp = (): string => randomInt(0, 1_000_000).toString().padStart(6, '0');

/** OTP codes are stored hashed (never in plain text). */
export const hashOtp = (code: string): string => createHash('sha256').update(code).digest('hex');

export const otpExpiry = (): string =>
  new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000).toISOString();
