/* eslint-disable max-len */
require('dotenv').config();

const { NODE_ENV, PRODUCTION_DB_ADDRESS } = process.env;

exports.checkEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
exports.checkURL = /(https?:\/\/)(w{3}\.)?\w+[-.~:/?#[\]@!$&'()*+,;=]*#?/;

exports.limiterOptions = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standartHeaders: true,
  legacyHeaders: false,
};

exports.developmentKey = 'dev-secret';
exports.mongodbPath = (NODE_ENV === 'production')
  ? PRODUCTION_DB_ADDRESS
  : 'mongodb://127.0.0.1:27017/bitfilmsdb';

exports.corsOptions = {
  origin: ['http://localhost:3000', 'https://diploma.nomoreparties.sbs', 'https://api.nomoreparties.co/beatfilm-movies'],
  credentials: true,
  maxAge: 3600,
};
