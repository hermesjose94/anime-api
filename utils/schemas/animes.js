const joi = require('@hapi/joi');

const nameSchema = joi.string().max(100);
const episodeSchema = joi.number().min(1).max(10000);
const dateSchema = joi.string().max(45);
const stationSchema = joi.number().min(1).max(4);
const coverSchema = joi.string().uri();
const descriptionSchema = joi.string();
const sourceSchema = joi.string().uri();
const statusSchema = joi.number().min(1).max(3);
const seasonSchema = joi.number().min(1).max(100);
const premiereSchema = joi.number().min(1).max(7);
const tagsSchema = joi.array().items(joi.string().max(50));

const animeIdSchema = joi.object({
  animeId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const createAnimeSchema = joi.object({
  name: nameSchema.required(),
  episode: episodeSchema.required(),
  date: dateSchema.required(),
  station: stationSchema.required(),
  cover: coverSchema.required(),
  description: descriptionSchema.required(),
  source: sourceSchema.required(),
  status: statusSchema.required(),
  season: seasonSchema.required(),
  premiere: premiereSchema.required(),
  tags: tagsSchema,
});

const updateAnimeSchema = joi.object({
  name: nameSchema,
  episode: episodeSchema,
  date: dateSchema,
  station: stationSchema,
  cover: coverSchema,
  description: descriptionSchema,
  source: sourceSchema,
  status: statusSchema,
  season: seasonSchema,
  premiere: premiereSchema,
  tags: tagsSchema,
});

module.exports = { animeIdSchema, createAnimeSchema, updateAnimeSchema };
