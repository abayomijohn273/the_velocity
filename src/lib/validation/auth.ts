import { z } from 'zod';

const email = z.string().trim().toLowerCase().email('Enter a valid email address');

const password = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-z]/, 'Include at least one lowercase letter')
  .regex(/[A-Z]/, 'Include at least one uppercase letter')
  .regex(/[0-9]/, 'Include at least one number');

const otpPurpose = z.enum(['email_verification', 'member_activation', 'password_reset']);

export const signupSchema = z.object({
  email,
  password,
});
export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required'),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const emailOnlySchema = z.object({ email });
export type EmailOnlyInput = z.infer<typeof emailOnlySchema>;

export const verifyOtpSchema = z.object({
  email,
  purpose: otpPurpose,
  code: z.string().regex(/^\d{6}$/, 'Enter the 6-digit code'),
});
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

export const resendOtpSchema = z.object({ email, purpose: otpPurpose });
export type ResendOtpInput = z.infer<typeof resendOtpSchema>;

/** Used by complete-signup and reset-password (set password with a one-time token). */
export const setPasswordSchema = z
  .object({
    token: z.string().min(1, 'Verification token is required'),
    password,
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type SetPasswordInput = z.infer<typeof setPasswordSchema>;

/** Client-side form shape for set-password screens (token is injected separately). */
export const setPasswordFormSchema = z
  .object({
    password,
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type SetPasswordFormInput = z.infer<typeof setPasswordFormSchema>;
