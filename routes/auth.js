//Librerias instaladas
import express from 'express';
import passport from 'passport';
import boom from '@hapi/boom';
//Librerias propias
import ApiKeysService from '../services/apiKeys';
import UsersService from '../services/users';
import validationHandler from '../utils/middleware/validationHandler';
import { createUserSchema } from '../utils/schemas/user';
import config from '../config/index';
import {
  refreshTokens,
  cookieOptions,
  generateToken,
  generateRefreshToken,
  clearTokens,
  handleResponse,
  verifyToken,
} from '../utils/auth/auth';

import '../utils/auth/strategies/basic';

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();
  const usersService = new UsersService();

  router.get('/sign-in', async function (req, res, next) {
    passport.authenticate('basic', function (error, user) {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }

        req.login(user, { session: false }, async function (error) {
          if (error) {
            next(error);
          }

          const apiKeyToken = user.isAdmin
            ? config.adminApiKeyToken
            : config.publicApiKeyToken;

          const apiKey = await apiKeysService.getApiKey({
            token: apiKeyToken,
          });

          if (!apiKey) {
            next(boom.unauthorized());
          }

          const { _id: id, name, email, isAdmin } = user;

          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes,
          };

          // generate access token
          const tokenObj = generateToken(payload);

          // generate refresh token
          const refreshToken = generateRefreshToken(payload);

          // refresh token list to manage the xsrf token
          refreshTokens[refreshToken] = tokenObj.xsrfToken;

          // set cookies
          res.cookie('refreshToken', refreshToken, cookieOptions);
          res.cookie('XSRF-TOKEN', tokenObj.xsrfToken);

          return res.status(200).json({
            user: { id, name, email, isAdmin },
            token: tokenObj.token,
            expiredAt: tokenObj.expiredAt,
          });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post('/logout', async function (req, res) {
    clearTokens(req, res);
    res.sendStatus(204);
  });

  router.post('/verifyToken', async function (req, res) {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;
    if (!refreshToken) {
      return res.sendStatus(204);
    }

    // verify xsrf token
    const xsrfToken = req.headers['x-xsrf-token'];

    if (
      !xsrfToken ||
      !(refreshToken in refreshTokens) ||
      refreshTokens[refreshToken] !== xsrfToken
    ) {
      return handleResponse(req, res, 401);
    }

    verifyToken(refreshToken, '', async (err, decoded) => {
      if (!err) {
        const user = await usersService.getUserEmail(decoded);

        if (!user) {
          return handleResponse(req, res, 401);
        }

        const apiKeyToken = user.isAdmin
          ? config.adminApiKeyToken
          : config.publicApiKeyToken;

        const apiKey = await apiKeysService.getApiKey({
          token: apiKeyToken,
        });

        if (!apiKey) {
          next(boom.unauthorized());
        }

        const { _id: id, name, email, isAdmin } = user;

        const payload = {
          sub: id,
          name,
          email,
          scopes: apiKey.scopes,
        };

        // // generate access token
        const tokenObj = generateToken({ payload });

        // // refresh token list to manage the xsrf token
        refreshTokens[refreshToken] = tokenObj.xsrfToken;
        res.cookie('XSRF-TOKEN', tokenObj.xsrfToken);

        // // return the token along with user details
        return handleResponse(req, res, 200, {
          user: { id, name, email, isAdmin },
          token: tokenObj.token,
          expiredAt: tokenObj.expiredAt,
        });
      } else {
        return handleResponse(req, res, 401);
      }
    });
  });

  router.post('/sign-up', validationHandler(createUserSchema), async function (
    req,
    res,
    next
  ) {
    const { body: user } = req;

    try {
      const userExists = await usersService.getUserEmail(user);

      if (userExists) {
        const { _id: id, name, email } = userExists;

        return res.status(200).json({
          user: { id, name, email },
          message: 'user already exists',
        });
      }

      const createdUserId = await usersService.createUser({ user });

      res.status(201).json({
        data: createdUserId,
        message: 'user created',
      });
    } catch (error) {
      next(error);
    }
  });
}

export default authApi;
