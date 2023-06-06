import { registerAs } from '@nestjs/config';

import { S3Config } from './s3.type';

export const s3Loader = registerAs(
  's3',
  (): S3Config => ({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    bucket: process.env.S3_BUCKET,
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
  }),
);
