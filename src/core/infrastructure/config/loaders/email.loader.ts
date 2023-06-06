import { registerAs } from '@nestjs/config';
import { EmailConfig } from '@app/common/types/email/email.type';

export const emailConfigLoader = registerAs(
  'email',
  (): EmailConfig => ({
    from: process.env.EMAIL_FROM,
    region: process.env.EMAIL_REGION,
    credentials: {
      publicKey: process.env.EMAIL_PUBLIC_KEY,
      secretKey: process.env.EMAIL_SECRET_KEY,
    },
    bcc: (process.env.EMAIL_BCC || '').split(','),
  }),
);
