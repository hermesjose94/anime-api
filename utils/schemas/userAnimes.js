const joi = require('@hapi/joi');

const id = joi
  .string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();

const userAnimeIdSchema = joi.object({
  userAnimeId: id,
});

const createUserAnimeSchema = joi.object({
  userId: id,
  animeId: id,
});

const updateUserAnimeSchema = joi.object({
  episode: joi.number().min(1).max(10000).required(),
});

module.exports = {
  userAnimeIdSchema,
  createUserAnimeSchema,
  updateUserAnimeSchema,
};
