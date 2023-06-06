import { SesConfiguration } from '@app/common';
import { registerAs } from '@nestjs/config';

export const sesConfigLoader = registerAs(
  'ses',
  (): SesConfiguration => ({
    credentials: {
      accessKey: process.env.SES_ACCESS_KEY,
      secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
    },
    region: process.env.SES_REGION,
    from: process.env.SES_FROM,
    bcc: (process.env.SES_BCC ?? '').split(','),
  }),
);
