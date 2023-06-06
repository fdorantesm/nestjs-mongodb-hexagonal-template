import * as Joi from 'joi';

export const configSchema = Joi.object({
  HOST: Joi.string().default('localhost'),
  PORT: Joi.number().required(),
});
