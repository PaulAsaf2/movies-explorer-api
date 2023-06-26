/* eslint-disable max-len */
exports.checkEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
exports.checkURL = /(https?:\/\/)(w{3}\.)?\w+[-.~:/?#[\]@!$&'()*+,;=]*#?/;

exports.limiterOptions = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standartHeaders: true,
  legacyHeaders: false,
};

exports.developmentKey = 'dev-secret';
exports.mongodbPath = 'mongodb://127.0.0.1:27017/bitfilmsdb';
