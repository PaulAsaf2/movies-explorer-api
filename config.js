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

exports.limiterOptions = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standartHeaders: true,
  legacyHeaders: false,
};

exports.incorrectAuthorisationData = 'Вы ввели неправильный логин или пароль';
exports.authorisationError = 'При авторизации произошла ошибка. Токен не передан или передан не в том формате';
exports.emailExistError = 'Пользователь с таким email уже существует';
exports.userCreated = 'Пользователь успешно создан';
exports.successfulExit = 'Успешный выход из учётной записи';
exports.userNotFound = 'Пользователь не найден';
exports.registrationError = 'При регистрации пользователя произошла ошибка';

/*
// Страница регистрации пользователя
2. При регистрации пользователя произошла ошибка.

// Страница обновления профиля
2. При обновлении профиля произошла ошибка.

Другое
// 1. 500 На сервере произошла ошибка.
2. 404 Страница по указанному маршруту не найдена.
*/
