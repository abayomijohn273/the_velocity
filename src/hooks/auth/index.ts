'use client';

import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';
import type {
  EmailOnlyInput,
  LoginInput,
  ResendOtpInput,
  SetPasswordInput,
  SignupInput,
  VerifyOtpInput,
} from '@/lib/validation/auth';
import type { AuthUser } from '@/types/user';

const post = <T>(path: string, body: unknown) =>
  apiFetch<T>(path, { method: 'POST', body: JSON.stringify(body) });

export const useSignup = () =>
  useMutation({
    mutationFn: (input: SignupInput) => post<{ email: string }>('/api/auth/signup', input),
  });

export const useLogin = () =>
  useMutation({
    mutationFn: (input: LoginInput) => post<{ user: AuthUser }>('/api/auth/login', input),
  });

export const useLogout = () =>
  useMutation({
    mutationFn: () => post<{ loggedOut: boolean }>('/api/auth/logout', {}),
  });

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: (input: VerifyOtpInput) =>
      post<{ verified: boolean; actionToken?: string }>('/api/auth/verify-otp', input),
  });

export const useResendOtp = () =>
  useMutation({
    mutationFn: (input: ResendOtpInput) => post<{ sent: boolean }>('/api/auth/resend-otp', input),
  });

export const useExistingMember = () =>
  useMutation({
    mutationFn: (input: EmailOnlyInput) =>
      post<{ email: string }>('/api/auth/existing-member', input),
  });

export const useCompleteSignup = () =>
  useMutation({
    mutationFn: (input: SetPasswordInput) =>
      post<{ completed: boolean }>('/api/auth/complete-signup', input),
  });

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (input: EmailOnlyInput) =>
      post<{ sent: boolean }>('/api/auth/forgot-password', input),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: (input: SetPasswordInput) =>
      post<{ reset: boolean }>('/api/auth/reset-password', input),
  });
