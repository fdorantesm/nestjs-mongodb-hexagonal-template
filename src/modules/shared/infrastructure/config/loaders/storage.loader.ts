import { S3Configuration } from '@app/common/types/s3/s3.type';
import { registerAs } from '@nestjs/config';

export const s3ConfigLoader = registerAs(
  's3',
  (): S3Configuration => ({
    endpoint: process.env.STORAGE_ENDPOINT,
    accessKey: process.env.STORAGE_PUBLIC_KEY,
    secretAccessKey: process.env.STORAGE_PRIVATE_KEY,
    bucket: process.env.STORAGE_REPOSITORY,
  }),
);
