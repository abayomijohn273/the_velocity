/** Centralised app route paths so navigation stays consistent and refactor-safe. */
export const routes = {
  home: '/',
  signup: '/signup',
  login: '/login',
  verifyOtp: '/verify-otp',
  signupSuccess: '/signup-success',
  completeSignup: '/complete-signup',
  existingMember: '/existing-member',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  completeProfile: '/complete-profile',
  dashboard: '/dashboard',
  settings: '/settings',
  admin: '/admin',
} as const;

/** Routes a signed-in user should be bounced away from back to the dashboard. */
export const authRoutes: string[] = [
  routes.signup,
  routes.login,
  routes.verifyOtp,
  routes.signupSuccess,
  routes.completeSignup,
  routes.existingMember,
  routes.forgotPassword,
  routes.resetPassword,
];

/** Routes that require a valid session. */
export const protectedRoutes: string[] = [
  routes.completeProfile,
  routes.dashboard,
  routes.settings,
  routes.admin,
];

/** Routes that additionally require the admin role. */
export const adminRoutes: string[] = [routes.admin];
