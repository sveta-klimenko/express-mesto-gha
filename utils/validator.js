import { Joi, celebrate } from 'celebrate';

export const linkRegExp = /^https?:\/\/(www.)?[\w\-._~:/?#[\]@!$&'()*+,;=]*#?$/;

export const signUpValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkRegExp),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required(),
  }),
});

export const signInValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required(),
  }),
});
