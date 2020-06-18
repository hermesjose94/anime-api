//Librerias instaladas
import express from 'express';
//Librerias propias
import AnimeService from '../services/animes';
import validationHandler from '../utils/middleware/validationHandler';
import scopesValidationHandler from '../utils/middleware/scopesValidationHandler';
import cacheResponse from '../utils/cacheResponse';
import {
  animeIdSchema,
  createAnimeSchema,
  updateAnimeSchema,
} from '../utils/schemas/animes';
import {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} from '../utils/time';
import authMiddleware from '../utils/middleware/authMiddleware';

const AnimesApi = (app) => {
  const router = express.Router();
  app.use('/api/animes', router);

  const animesService = new AnimeService();

  router.get(
    '/',
    authMiddleware,
    scopesValidationHandler(['read:animes']),
    async (req, res, next) => {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { tags } = req.query;

      try {
        const animes = await animesService.getAnimes({ tags });

        res.status(200).json({
          data: animes,
          message: 'animes listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/:animeId',
    authMiddleware,
    scopesValidationHandler(['read:animes']),
    validationHandler(animeIdSchema, 'params'),
    async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { animeId } = req.params;

      try {
        const anime = await animesService.getAnime({ animeId });
        res.status(200).json({
          data: anime,
          message: 'anime retrived',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    authMiddleware,
    scopesValidationHandler(['create:animes']),
    validationHandler(createAnimeSchema),
    async (req, res, next) => {
      const { body: anime } = req;

      try {
        const createdAnimeId = await animesService.createAnime({ anime });
        res.status(201).json({
          data: createdAnimeId,
          message: 'anime created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:animeId',
    authMiddleware,
    scopesValidationHandler(['update:animes']),
    validationHandler(animeIdSchema, 'params'),
    validationHandler(updateAnimeSchema),
    async (req, res, next) => {
      const { animeId } = req.params;
      const { body: movie } = req;

      try {
        const updatedAnimeId = await moviesService.updateMovie({
          animeId,
          movie,
        });
        res.status(200).json({
          data: updatedAnimeId,
          message: 'anime updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:animeId',
    authMiddleware,
    scopesValidationHandler(['delete:animes']),
    validationHandler(animeIdSchema, 'params'),
    async (req, res, next) => {
      const { animeId } = req.params;

      try {
        const deleteAnimeId = await moviesService.deleteMovie({ animeId });
        res.status(200).json({
          data: deleteAnimeId,
          message: 'anime deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

export default AnimesApi;
