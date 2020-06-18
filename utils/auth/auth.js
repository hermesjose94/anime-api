import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import moment from 'moment';
import ms from 'ms';

import config from '../../config/index';

// refresh token list to manage the xsrf token
const refreshTokens = {};

const cookieOptions = {
  // domain: "localhost",
  httpOnly: true,
  secure: !config.dev,
  signed: true,
};

const generateToken = (payload) => {
  const buffer = crypto.randomBytes(32);
  const xsrfToken = buffer.toString('hex');

  const privateKey = config.authJwtSecret + xsrfToken;

  const token = jwt.sign(payload, privateKey, {
    expiresIn: config.accessTokenLife,
  });

  const expiredAt = moment().add(ms(config.accessTokenLife), 'ms').valueOf();

  return {
    token,
    expiredAt,
    xsrfToken,
  };
};

const generateRefreshToken = (payload) => {
  // const { id: payload } = user;
  if (!payload) {
    return null;
  }
  const token = jwt.sign(payload, config.authJwtSecret, {
    expiresIn: config.refreshTokenLife,
  });

  return token;
};

// verify access token and refresh token
function verifyToken(token, xsrfToken = '', cb) {
  const privateKey = config.authJwtSecret + xsrfToken;
  jwt.verify(token, privateKey, cb);
}

const clearTokens = (req, res) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  delete refreshTokens[refreshToken];
  res.clearCookie('XSRF-TOKEN');
  res.clearCookie('refreshToken', cookieOptions);
};

const handleResponse = (req, res, statusCode, data, message) => {
  let isError = false;
  let errorMessage = message;
  switch (statusCode) {
    case 204:
      return res.sendStatus(204);
    case 400:
      isError = true;
      break;
    case 401:
      isError = true;
      errorMessage = message || 'Invalid user.';
      clearTokens(req, res);
      break;
    case 403:
      isError = true;
      errorMessage = message || 'Access to this resource is denied.';
      clearTokens(req, res);
      break;
    default:
      break;
  }
  const resObj = data || {};
  if (isError) {
    resObj.error = true;
    resObj.message = errorMessage;
  }
  return res.status(statusCode).json(resObj);
};

export {
  refreshTokens,
  cookieOptions,
  generateToken,
  generateRefreshToken,
  clearTokens,
  handleResponse,
  verifyToken,
};
