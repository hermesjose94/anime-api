const joi = require('@hapi/joi');
import { animeIdSchema } from './animes';
import { userIdSchema } from './user';

const userAnimeIdSchema = joi.object({
  userAnimeId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const createUserAnimeSchema = joi.object({
  userId: userIdSchema.required(),
  animeId: animeIdSchema.required(),
});

export { userAnimeIdSchema, createUserAnimeSchema };
