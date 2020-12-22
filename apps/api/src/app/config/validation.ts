import * as Joi from '@hapi/joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  PAT: Joi.string().required(),
  API_URL: Joi.string().required(),
  WHITELIST_URL: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production').required(),
});
