const { celebrate, Joi } = require('celebrate');
const { checkURL } = require('../utils/config');

exports.signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

exports.signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

exports.userUpdateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

exports.createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    description: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    id: Joi.number().required(),
    image: Joi.string().pattern(checkURL).required(),
    nameEN: Joi.string().required(),
    nameRU: Joi.string().required(),
    trailerLink: Joi.string().pattern(checkURL).required(),
    year: Joi.number().required(),
  }),
});
