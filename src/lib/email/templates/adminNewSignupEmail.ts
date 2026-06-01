import { baseLayout } from './baseLayout';

export const adminNewSignupTemplate = (userEmail: string) => {
  const subject = `New signup on The Velocity: ${userEmail}`;
  const html = baseLayout({
    title: 'New signup',
    body: `
      <h1 style="margin:0 0 12px;font-size:22px;color:#012c18;">New member signup</h1>
      <p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:#374151;">
        A new user just signed up and verified their email:
      </p>
      <p style="margin:0;font-size:16px;font-weight:bold;color:#012c18;">${userEmail}</p>
    `,
  });
  return { subject, html };
};
