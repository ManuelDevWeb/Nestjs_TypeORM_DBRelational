// Joi para validar
import * as Joi from 'joi';

const configSchema = Joi.object({
  API_KEY: Joi.number().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  PORT: Joi.number().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
});

export { configSchema };
