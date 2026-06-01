import { NextResponse, type NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { limitForPath, rateLimit } from '@/lib/api/rateLimit';
import { authRoutes, protectedRoutes, routes } from '@/lib/constants/routes';

const AUTH_COOKIE = 'velocity_token';

const applySecurityHeaders = (res: NextResponse): NextResponse => {
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('X-DNS-Prefetch-Control', 'off');
  return res;
};

const applyCors = (res: NextResponse, origin: string | null): NextResponse => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? '';
  const allowed = origin && (origin === appUrl || origin.endsWith('localhost:3000'));
  res.headers.set('Access-Control-Allow-Origin', allowed ? origin : appUrl);
  res.headers.set('Access-Control-Allow-Credentials', 'true');
  res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.headers.set('Vary', 'Origin');
  return res;
};

const clientIp = (req: NextRequest): string =>
  req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
  req.headers.get('x-real-ip') ||
  'unknown';

const handleApi = (req: NextRequest): NextResponse => {
  const origin = req.headers.get('origin');

  if (req.method === 'OPTIONS') {
    return applyCors(new NextResponse(null, { status: 204 }), origin);
  }

  const { limit, windowMs } = limitForPath(req.nextUrl.pathname);
  const key = `${clientIp(req)}:${req.nextUrl.pathname}`;
  const result = rateLimit(key, limit, windowMs);

  if (!result.allowed) {
    const res = NextResponse.json(
      { success: false, message: 'Too many requests. Please slow down and try again shortly.' },
      { status: 429 }
    );
    res.headers.set('Retry-After', Math.ceil((result.resetAt - Date.now()) / 1000).toString());
    return applyCors(applySecurityHeaders(res), origin);
  }

  const res = NextResponse.next();
  res.headers.set('X-RateLimit-Limit', limit.toString());
  res.headers.set('X-RateLimit-Remaining', result.remaining.toString());
  return applyCors(applySecurityHeaders(res), origin);
};

const handlePage = async (req: NextRequest): Promise<NextResponse> => {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const session = token ? await verifyToken(token) : null;

  const isProtected = protectedRoutes.some((path) => pathname.startsWith(path));
  const isAuthRoute = authRoutes.some((path) => pathname.startsWith(path));

  // Expired/absent token on a protected route → clear cookie and send to login.
  if (isProtected && !session) {
    const res = NextResponse.redirect(new URL(routes.login, req.url));
    res.cookies.delete(AUTH_COOKIE);
    return applySecurityHeaders(res);
  }

  // Already signed in but visiting an auth page → go to the dashboard.
  if (isAuthRoute && session) {
    return applySecurityHeaders(NextResponse.redirect(new URL(routes.dashboard, req.url)));
  }

  return applySecurityHeaders(NextResponse.next());
};

export const middleware = (req: NextRequest): Promise<NextResponse> | NextResponse => {
  if (req.nextUrl.pathname.startsWith('/api')) {
    return handleApi(req);
  }
  return handlePage(req);
};

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
    '/complete-profile/:path*',
    '/settings/:path*',
    '/login',
    '/signup',
    '/verify-otp',
    '/signup-success',
    '/complete-signup',
    '/existing-member',
    '/forgot-password',
    '/reset-password',
  ],
};
