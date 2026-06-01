import 'server-only';
import { fromAddress, getTransporter } from './transporter';
import { otpEmailTemplate } from './templates/otpEmail';
import { signupSuccessTemplate } from './templates/signupSuccessEmail';
import { adminNewSignupTemplate } from './templates/adminNewSignupEmail';
import { env } from '@/lib/config/env';
import { routes } from '@/lib/constants/routes';
import type { OtpPurpose } from '@/types/user';

interface SendArgs {
  to: string;
  subject: string;
  html: string;
}

const send = async ({ to, subject, html }: SendArgs): Promise<void> => {
  await getTransporter().sendMail({ from: fromAddress(), to, subject, html });
};

export const sendOtpEmail = async (
  to: string,
  code: string,
  purpose: OtpPurpose
): Promise<void> => {
  const { subject, html } = otpEmailTemplate(code, purpose);
  await send({ to, subject, html });
};

export const sendSignupSuccessEmail = async (to: string): Promise<void> => {
  const { subject, html } = signupSuccessTemplate(`${env.appUrl}${routes.login}`);
  await send({ to, subject, html });
};

export const sendAdminNewSignupEmail = async (userEmail: string): Promise<void> => {
  const { subject, html } = adminNewSignupTemplate(userEmail);
  await send({ to: env.adminEmail, subject, html });
};
