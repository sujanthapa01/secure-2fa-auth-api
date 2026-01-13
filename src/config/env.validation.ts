import * as Joi from 'joi';

export const envValidationSchima = Joi.object({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
  SUPER_ADMIN_EMAIL: Joi.string().email().required(),
  SUPER_ADMIN_PASSWORD: Joi.string().min(10).required(),
  SUPER_ADMIN_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  DATABASE_URL: Joi.string().required()
});
