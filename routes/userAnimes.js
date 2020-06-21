//Librerias instaladas
const express = require('express');
//Librerias propias
const UserAnimesService = require('../services/userAnimes');
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');
const { userIdSchema } = require('../utils/schemas/user');
const {
  userAnimeIdSchema,
  createUserAnimeSchema,
  updateUserAnimeSchema,
} = require('../utils/schemas/userAnimes');
//JWT strategies
const authMiddleware = require('../utils/middleware/authMiddleware');

function userAnimesApi(app) {
  const router = express.Router();
  app.use('/api/user-animes', router);

  const userAnimesService = new UserAnimesService();

  router.get(
    '/:userId/:animeId',
    authMiddleware,
    scopesValidationHandler(['read:user-animes']),
    validationHandler(createUserAnimeSchema, 'params'),
    async function (req, res, next) {
      const { userId, animeId } = req.params;
      try {
        const userAnime = await userAnimesService.getUserAnime({
          userId,
          animeId,
        });

        res.status(200).json({
          data: userAnime,
          message: 'user anime retrived',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/:userId',
    authMiddleware,
    scopesValidationHandler(['read:user-animes']),
    validationHandler(userIdSchema, 'params'),
    async function (req, res, next) {
      const { userId } = req.params;
      const { tags, order, week, status } = req.query;
      try {
        const userAnimes = await userAnimesService.getUserAnimes({
          userId,
          tags,
          order,
          week,
          status,
        });

        res.status(200).json({
          data: userAnimes,
          message: 'user animes listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    authMiddleware,
    scopesValidationHandler(['create:user-animes']),
    validationHandler(createUserAnimeSchema),
    async function (req, res, next) {
      const { body: userAnime } = req;

      try {
        const createdUserAnimeId = await userAnimesService.createUserAnime({
          userAnime,
        });
        const message =
          createdUserAnimeId != null
            ? 'user anime created'
            : 'anime has this on your list';

        res.status(201).json({
          data: createdUserAnimeId,
          message,
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.put(
    '/:userAnimeId',
    authMiddleware,
    scopesValidationHandler(['update:user-animes']),
    validationHandler(userAnimeIdSchema, 'params'),
    validationHandler(updateUserAnimeSchema),
    async function (req, res, next) {
      const { userAnimeId } = req.params;
      const { body: userAnime } = req;

      try {
        const updatedUserAnimeId = await userAnimesService.updateUserAnime({
          userAnimeId,
          userAnime,
        });

        res.status(200).json({
          data: updatedUserAnimeId,
          message: 'user anime updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:userAnimeId',
    authMiddleware,
    scopesValidationHandler(['delete:user-animes']),
    validationHandler(userAnimeIdSchema, 'params'),
    async function (req, res, next) {
      const { userAnimeId } = req.params;

      try {
        const deletedUserAnimeId = await userAnimesService.deleteUserAnime({
          userAnimeId,
        });

        res.status(200).json({
          data: deletedUserAnimeId,
          message: 'user anime deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = userAnimesApi;
