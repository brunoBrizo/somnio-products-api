import * as Joi from 'joi';

export const validationSchemaConfig = Joi.object({
  PORT: Joi.number().default(3000),
  DB_SYNCHRONIZE: Joi.boolean().default(true),
  DB_MIGRATIONS_RUN: Joi.boolean().default(true),
  DATABASE_URL: Joi.string().required(),
  NODE_ENV: Joi.string().required(),
});
