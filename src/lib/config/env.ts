import 'server-only';

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const optional = (key: string, fallback: string): string => process.env[key] ?? fallback;

/**
 * Server-only environment configuration. Values are read lazily (via getters)
 * so importing this module never throws at build time — only when a missing
 * variable is actually accessed at runtime.
 */
export const env = {
  get appUrl() {
    return optional('NEXT_PUBLIC_APP_URL', 'http://localhost:3000');
  },
  supabase: {
    get url() {
      return required('NEXT_PUBLIC_SUPABASE_URL');
    },
    get serviceRoleKey() {
      return required('SUPABASE_SERVICE_ROLE_KEY');
    },
  },
  jwt: {
    get secret() {
      return required('JWT_SECRET');
    },
    get expiresIn() {
      return optional('JWT_EXPIRES_IN', '7d');
    },
  },
  smtp: {
    get host() {
      return optional('SMTP_HOST', 'smtp.gmail.com');
    },
    get port() {
      return Number(optional('SMTP_PORT', '465'));
    },
    get secure() {
      return optional('SMTP_SECURE', 'true') === 'true';
    },
    get user() {
      return required('SMTP_USER');
    },
    get password() {
      return required('SMTP_PASSWORD');
    },
    get fromName() {
      return optional('EMAIL_FROM_NAME', 'The Velocity');
    },
    get fromAddress() {
      return required('EMAIL_FROM_ADDRESS');
    },
  },
  get adminEmail() {
    return required('ADMIN_EMAIL');
  },
} as const;

/** Token lifetime in seconds (7 days). Kept in sync with the cookie max-age. */
export const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;
