interface Bucket {
  count: number;
  resetAt: number;
}

/**
 * Simple in-memory fixed-window rate limiter.
 * NOTE: per-instance only. For multi-instance/serverless production, back this
 * with a shared store (e.g. Upstash Redis) using the same interface.
 */
const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export const rateLimit = (key: string, limit: number, windowMs: number): RateLimitResult => {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit - 1, resetAt };
  }

  bucket.count += 1;
  const allowed = bucket.count <= limit;
  return { allowed, remaining: Math.max(0, limit - bucket.count), resetAt: bucket.resetAt };
};

/** Stricter limits for sensitive auth endpoints, looser for everything else. */
export const limitForPath = (pathname: string): { limit: number; windowMs: number } => {
  const sensitive = [
    '/api/auth/login',
    '/api/auth/signup',
    '/api/auth/verify-otp',
    '/api/auth/resend-otp',
    '/api/auth/forgot-password',
    '/api/auth/existing-member',
  ];
  if (sensitive.some((path) => pathname.startsWith(path))) {
    return { limit: 8, windowMs: 60_000 };
  }
  return { limit: 60, windowMs: 60_000 };
};
