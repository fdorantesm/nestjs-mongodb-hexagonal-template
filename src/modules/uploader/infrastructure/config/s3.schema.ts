import * as Joi from 'joi';

export const s3Schema = Joi.object({
  S3_ACCESS_KEY: Joi.string().optional(),
  S3_SECRET_ACCESS_KEY: Joi.string().optional(),
  S3_BUCKET: Joi.string().optional(),
  S3_ENDPOINT: Joi.string().optional(),
});
