/* eslint-disable max-len */
exports.INCORRECT_DATA = 400;
exports.UNAUTHORIZED = 401;
exports.FORBIDDEN = 403;
exports.NO_DATA_FOUND = 404;
exports.CONFLICT = 409;
exports.SERVER_ERROR = 500;

exports.checkEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
exports.checkURL = /(https?:\/\/)(w{3}\.)?\w+[-.~:/?#[\]@!$&'()*+,;=]*#?/;
exports.checkRU = /^[а-яА-ЯёЁ]+$/;
