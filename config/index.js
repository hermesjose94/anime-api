require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3001,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
  defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
  authJwtSecret: process.env.AUTH_JWT_SECRET,
  authCookieSecret: process.env.AUTH_COOKIE_SECRET,
  accessTokenLife: process.env.ACCESS_TOKEN_LIFE,
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE,
  publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
  adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN,
};

module.exports = config;
