interface BaseLayoutOptions {
  title: string;
  body: string;
}

const PRIMARY = '#012c18';
const SECONDARY = '#7b9404';

/** Shared, email-client-safe HTML shell used by every template. */
export const baseLayout = ({ title, body }: BaseLayoutOptions): string => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f6ee;font-family:Arial,Helvetica,sans-serif;color:#1d1e22;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6ee;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background-color:${PRIMARY};padding:28px 32px;">
                <span style="color:#ffffff;font-size:22px;font-weight:bold;">The <span style="color:${SECONDARY};">Velocity</span></span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">${body}</td>
            </tr>
            <tr>
              <td style="padding:24px 32px;background-color:#fafbf5;border-top:1px solid #eef0e4;">
                <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.6;">
                  A product of Great Minds Collective.<br />
                  &copy; The Velocity ${new Date().getFullYear()}. All Rights Reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
