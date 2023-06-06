import * as Joi from 'joi';

export const configSchema = Joi.object({
  HOST: Joi.string().default('localhost'),
  PORT: Joi.number().required(),
  RATE_MAX_REQUEST: Joi.number().default(100),
  RATE_INTERVAL: Joi.number().default(60),
});
