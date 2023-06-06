import * as Joi from 'joi';

export const JwtSchema = Joi.object({
  JWT_EXPIRES: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
