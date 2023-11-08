import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  //DB_PORT: Joi.string().optional(),
  DB_USERNAME: Joi.string().required(),
  // DB_PASSWORD: Joi.string().optional().default(''),
  JWT_SECRET: Joi.string().required(),
  PORT: Joi.number().default(3000),

  API_PREFIX: Joi.string().required(),
  CONTEXT: Joi.string().required(),
  ORIGINS: Joi.string().required(),
  ALLOWED_HEADERS: Joi.string().required(),
  ALLOWED_METHODS: Joi.string().required(),
  CORS_ENABLED: Joi.boolean().required(),
  CORS_CREDENTIALS: Joi.boolean().required(),
  SWAGGER_PATH: Joi.string().required(),
  SWAGGER_ENABLED: Joi.boolean().required(),
  TEST_KEY: Joi.string().required(),

  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().required(),

  FACEBOOK_CLIENT_ID: Joi.string().required(),
  FACEBOOK_CLIENT_SECRET: Joi.string().required(),
  FACEBOOK_CALLBACK_URL: Joi.string().required(),

  APPLE_CLIENT_ID: Joi.string().required(),
  APPLE_TEAM_ID: Joi.string().required(),
  APPLE_KEY_ID: Joi.string().required(),
  APPLE_PRIVATE_KEY: Joi.string().required(),
  APPLE_CALLBACK_URL: Joi.string().required(),

  MULTER_DEST: Joi.string().required(),

  SSL_KEY_PATH: Joi.string().required(),
  SSL_CERT_PATH: Joi.string().required(),
  SSL: Joi.boolean().required(),

  // MAIL_HOST: Joi.string().required(),
  // MAIL_USER: Joi.string().required(),
  // MAIL_PASSWORD: Joi.string().required(),
  // MAIL_FROM: Joi.string().required(),
  // MAIL_TRANSPORT: Joi.string().required(),
  // MAIN_SERVICE: Joi.string().required(),
});
