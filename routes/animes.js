//Librerias instaladas
const express = require('express');
//Librerias propias
const AnimeService = require('../services/animes');
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');
const cacheResponse = require('../utils/cacheResponse');
const {
  animeIdSchema,
  createAnimeSchema,
  updateAnimeSchema,
} = require('../utils/schemas/animes');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');
const authMiddleware = require('../utils/middleware/authMiddleware');

const AnimesApi = (app) => {
  const router = express.Router();
  app.use('/api/animes', router);

  const animesService = new AnimeService();

  router.get(
    '/',
    // authMiddleware,
    // scopesValidationHandler(['read:animes']),
    async (req, res, next) => {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { tags, order, week, status } = req.query;

      try {
        const animes = await animesService.getAnimes({
          tags,
          order,
          week,
          status,
        });

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
      const { body: anime } = req;

      try {
        const updatedAnimeId = await animesService.updateAnime({
          animeId,
          anime,
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
        const deleteAnimeId = await animesService.deleteAnime({ animeId });
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

module.exports = AnimesApi;
