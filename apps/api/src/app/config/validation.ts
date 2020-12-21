import * as Joi from '@hapi/joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  PAT: Joi.string().required(),
  API_URL: Joi.string().required(),
});
