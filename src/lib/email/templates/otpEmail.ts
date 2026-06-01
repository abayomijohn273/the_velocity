import { baseLayout } from './baseLayout';
import { OTP_TTL_MINUTES } from '@/lib/auth/otp';
import type { OtpPurpose } from '@/types/user';

const headingFor: Record<OtpPurpose, string> = {
  email_verification: 'Verify your email',
  member_activation: 'Confirm your membership',
  password_reset: 'Reset your password',
};

const introFor: Record<OtpPurpose, string> = {
  email_verification:
    'Use the code below to verify your email and continue setting up your account.',
  member_activation:
    'Welcome back! Use the code below to confirm your membership and set up your password.',
  password_reset:
    'Use the code below to reset your password. If you didn’t request this, you can ignore this email.',
};

export const otpEmailTemplate = (code: string, purpose: OtpPurpose) => {
  const subject = `${headingFor[purpose]} — your code is ${code}`;
  const html = baseLayout({
    title: headingFor[purpose],
    body: `
      <h1 style="margin:0 0 12px;font-size:24px;color:#012c18;">${headingFor[purpose]}</h1>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#374151;">${introFor[purpose]}</p>
      <div style="margin:0 0 24px;text-align:center;">
        <span style="display:inline-block;letter-spacing:10px;font-size:34px;font-weight:bold;color:#012c18;background-color:#f4f6ee;padding:18px 28px;border-radius:12px;">${code}</span>
      </div>
      <p style="margin:0;font-size:13px;color:#6b7280;">This code expires in ${OTP_TTL_MINUTES} minutes.</p>
    `,
  });
  return { subject, html };
};
