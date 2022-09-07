export const JWT_CONFIG = {
  secret: process.env.TOKEN_SECRET,
  expiresIn: process.env.TOKEN_EXPIRED_IN,
};
export const Refersh_JWT_CONFIG = {
  secret: process.env.TOKEN_SECRET,
  expiresIn: process.env.TOKEN_EXPIRED_IN,
};
export const CONFIRM_MAIL_TOKEN_CONFIG = {
  secret: process.env.TOKEN_SECRET,
  expiresIn: process.env.TOKEN_EXPIRED_IN,
};

export const optionsSwaggerConfig = {
  swaggerOptions: {
    authAction: {
      defaultBearerAuth: {
        name: 'defaultBearerAuth',
        schema: {
          description: 'Default',
          type: 'http',
          in: 'header',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        value: 'thisIsASampleBearerAuthToken123',
      },
    },
  },
};
