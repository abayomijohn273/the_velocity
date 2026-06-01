import { baseLayout } from './baseLayout';

export const signupSuccessTemplate = (loginUrl: string) => {
  const subject = 'Welcome to The Velocity 🎉';
  const html = baseLayout({
    title: 'Welcome to The Velocity',
    body: `
      <h1 style="margin:0 0 12px;font-size:24px;color:#012c18;">You're in! 🎉</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;">
        Your email has been verified and your account is ready. The Velocity is where rising stars
        connect, collaborate, and move together to achieve big things.
      </p>
      <p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#374151;">
        Log in to complete your profile and join the community.
      </p>
      <div style="text-align:center;">
        <a href="${loginUrl}" style="display:inline-block;background-color:#012c18;color:#ffffff;text-decoration:none;font-weight:bold;font-size:15px;padding:14px 32px;border-radius:999px;">
          Log in to continue
        </a>
      </div>
    `,
  });
  return { subject, html };
};
