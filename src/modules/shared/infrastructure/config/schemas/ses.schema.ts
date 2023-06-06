import * as Joi from 'joi';

export const sesSchema = Joi.object({
  SES_FROM: Joi.string().optional(),
  SES_REGION: Joi.string().optional(),
  SES_ACCESS_KEY: Joi.string().optional(),
  SES_SECRET_ACCESS_KEY: Joi.string().optional(),
  SES_BCC: Joi.string().optional(),
});
