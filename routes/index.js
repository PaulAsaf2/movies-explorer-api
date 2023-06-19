/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const express = require('express');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const authRoutes = require('./auth');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.use('/', authRoutes);
router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);

module.exports = router;

/*
Создайте роуты и контроллеры
В API должно быть 7 роутов:

# возвращает информацию о пользователе (email и имя)
GET /users/me

# обновляет информацию о пользователе (email и имя)
PATCH /users/me

# возвращает все сохранённые текущим  пользователем фильмы
GET /movies

# создаёт фильм с переданными в теле
# country, director, duration, year, description, image, trailer, nameRU,
nameEN и thumbnail, movieId
POST /movies

# удаляет сохранённый фильм по id
DELETE /movies/_id
-------------------------------------------------
# создаёт пользователя с переданными в теле
# email, password и name
POST /signup

# проверяет переданные в теле почту и пароль
# и возвращает JWT
POST /signin

Эти два роута не нужно защищать авторизацией.
Обратите внимание: если сохранять JWT в куках, понадобится дополнительный
роут POST /signout. При запросе к роуту удалится JWT из куков пользователя.
-------------------------------------------------
Создайте контроллер для каждого роута. Защитите роуты авторизацией:
если клиент не прислал JWT, доступ к роутам ему должен быть закрыт.
Реализуйте аутентификацию и авторизацию
В API должно быть ещё два роута: для регистрации и логина.
-------------------------------------------------
запрос на GET /users/me возвращает информацию о пользователе (email и имя);
PATCH /users/me — обновляет информацию о пользователе;
GET /movies все сохранённые пользователем фильмы;
POST /movies создаёт фильм с переданными в теле данными;
DELETE /movies/_id удаляет сохранённый фильм по _id;
POST /signup создаёт пользователя с переданными в теле данными;
POST /signin возвращает JWT, если в теле запроса переданы правильные почта
и пароль.
Если вы сохраняете JWT в куках, роут /signout должен удалять JWT из куки.
-------------------------------------------------
*/
