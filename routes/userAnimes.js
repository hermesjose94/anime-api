//Librerias instaladas
import express from 'express';
import passport from 'passport';
//Librerias propias
import UserAnimesService from '../services/userAnimes';
import validationHandler from '../utils/middleware/validationHandler';
import scopesValidationHandler from '../utils/middleware/scopesValidationHandler';
import { animeIdSchema } from '../utils/schemas/animes';
import { userIdSchema } from '../utils/schemas/user';
import { createUserAnimeSchema } from '../utils/schemas/userAnimes';
//JWT strategies
import authMiddleware from '../utils/middleware/authMiddleware';

function userAnimesApi(app) {
  const router = express.Router();
  app.use('/api/user-animes', router);

  const userAnimesService = new UserAnimesService();

  router.get(
    '/',
    authMiddleware,
    scopesValidationHandler(['read:user-animes']),
    validationHandler(userIdSchema, 'query'),
    async function (req, res, next) {
      const { userId } = req.query;

      try {
        const userAnimes = await userAnimesService.getUserAnimes({ userId });

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

        res.status(201).json({
          data: createdUserAnimeId,
          message: 'user anime created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:userAnimeId',
    authMiddleware,
    scopesValidationHandler(['delete:user-animes']),
    validationHandler(animeIdSchema, 'params'),
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

export default userAnimesApi;
