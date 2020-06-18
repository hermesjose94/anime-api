const joi = require('@hapi/joi');

const nameSchema = joi.string().max(100);
const episodeSchema = joi.number().min(1).max(10000);
const dateSchema = joi.string().max(45);
const stationSchema = joi.string().max(45);
const coverSchema = joi.string().uri();
const descriptionSchema = joi.string();
const sourceSchema = joi.string().uri();
const statusSchema = joi.string().max(100);
const seasonSchema = joi.number().min(1).max(100);
const premiereSchema = joi.string().max(10);
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

export { animeIdSchema, createAnimeSchema, updateAnimeSchema };
