import { jwtVerify, SignJWT } from 'jose';
import type { UserRole } from '@/types/user';

export interface TokenPayload {
  sub: string;
  email: string;
  role: UserRole;
}

const getSecret = (): Uint8Array => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('Missing required environment variable: JWT_SECRET');
  }
  return new TextEncoder().encode(secret);
};

const getExpiry = (): string => process.env.JWT_EXPIRES_IN || '7d';

export const signToken = (payload: TokenPayload): Promise<string> =>
  new SignJWT({ email: payload.email, role: payload.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(getExpiry())
    .sign(getSecret());

/** Verifies the token signature + expiry. Returns null when invalid/expired. */
export const verifyToken = async (token: string): Promise<TokenPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return {
      sub: String(payload.sub),
      email: String(payload.email),
      role: payload.role as UserRole,
    };
  } catch {
    return null;
  }
};
