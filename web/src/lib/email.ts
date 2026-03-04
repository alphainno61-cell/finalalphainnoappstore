// Email sending utility using Resend
import { Resend } from 'resend';

const resend = (() => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not configured');
    return null;
  }
  return new Resend(apiKey);
})();

export async function sendOTPEmail(email: string, code: string) {
  try {
    if (!resend) {
      console.warn('Resend service is not configured');
      return;
    }
    
    await resend.emails.send({
      from: 'Alphainno <onboarding@resend.dev>', // Update with your verified domain
      to: email,
      subject: 'Your verification code',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .logo { font-size: 24px; font-weight: bold; color: #3b82f6; }
              .content { background: #f9fafb; border-radius: 12px; padding: 30px; text-align: center; }
              .code { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1f2937; margin: 20px 0; }
              .footer { color: #6b7280; font-size: 14px; text-align: center; margin-top: 30px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">🔷 Alphainno</div>
              </div>
              <div class="content">
                <h2 style="margin: 0 0 10px 0;">Verify your email</h2>
                <p style="color: #6b7280; margin: 0 0 20px 0;">
                  We sent a 6-digit code to <strong>${email}</strong>
                </p>
                <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
                  <div class="code">${code}</div>
                </div>
                <p style="color: #6b7280; font-size: 14px; margin: 20px 0 0 0;">
                  This code will expire in 10 minutes.
                </p>
              </div>
              <div class="footer">
                If you didn't request this code, you can safely ignore this email.
              </div>
            </div>
          </body>
        </html>
      `,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send verification email');
  }
}
