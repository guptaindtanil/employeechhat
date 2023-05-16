import * as dotenv from 'dotenv';
dotenv.config();

export const envs = {
  env: process.env.NODE_ENV || 'dev',
  port: Number(process.env.NODE_PORT) || 4000,
  db: {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE,
    username: process.env.MONGO_USERNAME || '',
    password: process.env.MONGO_PASSWORD || '',
    authDatabase: process.env.MONGO_AUTHENTICATION_DATABASE || 'admin',
    option: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  },
  apiKey: process.env.API_KEY || '',
  passwordSalt: Number(process.env.PASSWORD_SALT_ROUND) || 10,
  jwt: {
    accessToken: {
      secret: process.env.USER_ACCESS_TOKEN_SECRET || '',
      expiry: Number(process.env.ACCESS_TOKEN_EXPIRED) || 3600,
    },
    refreshToken: {
      secret: process.env.USER_REFRESH_TOKEN_SECRET || '',
      expiry: Number(process.env.REFRESH_TOKE_EXPIRED) || 259200,
    },
  },
  smtp: {
    email: process.env.SMTP_AUTH_EMAIL,
    password: process.env.SMTP_AUTH_PASSWORD,
    host: process.env.SMTP_HOST,
    fromEmail: process.env.SMTP_FROM_EMAIL,
  },
};
