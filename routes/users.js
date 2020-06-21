//Librerias instaladas
const express = require('express');
//Librerias propias
const UsersService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');
const cacheResponse = require('../utils/cacheResponse');
const {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
} = require('../utils/schemas/user');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');
const authMiddleware = require('../utils/middleware/authMiddleware');

const UsersApi = (app) => {
  const router = express.Router();
  app.use('/api/users', router);

  const usersService = new UsersService();

  router.get(
    '/',
    authMiddleware,
    scopesValidationHandler(['read:users']),
    async (req, res, next) => {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { tags } = req.query;

      try {
        const users = await usersService.getUsers({ tags });

        res.status(200).json({
          data: users,
          message: 'users listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/:userId',
    authMiddleware,
    scopesValidationHandler(['read:users']),
    validationHandler(userIdSchema, 'params'),
    async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { userId } = req.params;

      try {
        const user = await usersService.getUser({ userId });
        res.status(200).json({
          data: user,
          message: 'user retrived',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    authMiddleware,
    scopesValidationHandler(['create:users']),
    validationHandler(createUserSchema),
    async (req, res, next) => {
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
    }
  );

  router.put(
    '/password/:userId',
    authMiddleware,
    scopesValidationHandler(['update:users']),
    validationHandler(userIdSchema, 'params'),
    validationHandler(updateUserSchema),
    async (req, res, next) => {
      const { userId } = req.params;
      const { body: user } = req;

      try {
        const updatedUserId = await usersService.updateUserPassword({
          userId,
          user,
        });
        res.status(200).json({
          data: updatedUserId,
          message: 'user password updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:userId',
    authMiddleware,
    scopesValidationHandler(['update:users']),
    validationHandler(userIdSchema, 'params'),
    validationHandler(updateUserSchema),
    async (req, res, next) => {
      const { userId } = req.params;
      const { body: user } = req;

      try {
        if (user.password) {
          delete user.password;
        }

        const userExists = await usersService.getUserEmail(user);

        if (userExists) {
          const { _id: id } = userExists;
          if (id != userId) {
            return res.status(200).json({
              message: 'email already exists',
            });
          }
        }

        const updatedUserId = await usersService.updateUser({
          userId,
          user,
        });
        res.status(200).json({
          data: updatedUserId,
          message: 'user updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:userId',
    authMiddleware,
    scopesValidationHandler(['delete:users']),
    validationHandler(userIdSchema, 'params'),
    async (req, res, next) => {
      const { userId } = req.params;

      try {
        const deleteUserID = await usersService.deleteUser({ userId });
        res.status(200).json({
          data: deleteUserID,
          message: 'user deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = UsersApi;
