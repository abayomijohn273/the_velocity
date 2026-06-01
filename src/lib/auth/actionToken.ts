import { jwtVerify, SignJWT } from 'jose';
import type { OtpPurpose } from '@/types/user';

interface ActionTokenPayload {
  sub: string;
  purpose: OtpPurpose;
}

const getSecret = (): Uint8Array => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('Missing required environment variable: JWT_SECRET');
  return new TextEncoder().encode(secret);
};

/**
 * Short-lived (15 min) token proving a user passed OTP verification, so they
 * can set/reset a password without a full session.
 */
export const signActionToken = (payload: ActionTokenPayload): Promise<string> =>
  new SignJWT({ purpose: payload.purpose, kind: 'action' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(getSecret());

export const verifyActionToken = async (
  token: string,
  expectedPurpose: OtpPurpose
): Promise<ActionTokenPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.kind !== 'action' || payload.purpose !== expectedPurpose) return null;
    return { sub: String(payload.sub), purpose: payload.purpose as OtpPurpose };
  } catch {
    return null;
  }
};
