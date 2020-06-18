const joi = require('@hapi/joi');

const name = joi.string().max(100);
const email = joi.string().email();
const password = joi.string();
const isAdmin = joi.boolean();

const userIdSchema = joi.object({
  userId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const createUserSchema = joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  isAdmin: isAdmin,
});

const updateUserSchema = joi.object({
  name: name,
  email: email,
  password: password,
  isAdmin: isAdmin,
});

export { userIdSchema, createUserSchema, updateUserSchema };
