import { celebrate, Joi } from 'celebrate';

export const userSignup = celebrate({
  body: Joi.object({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    phonenumber: Joi.string().required(),
  }),
});
