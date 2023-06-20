const express = require('express');
const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies');

const router = express.Router();

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:id', deleteMovie);

module.exports = router;

// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies

// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image, trailer, nameRU,
// nameEN и thumbnail, movieId
// POST /movies

// # удаляет сохранённый фильм по id
// DELETE /movies/_id

// Пользователь не может удалить сохранённую карточку из профиля другого
// пользователя. / 3.64
// Все роуты, кроме /signin и /signup, защищены авторизацией. / 3.64
// Роуты пользователей и роуты фильмов описаны в отдельных файлах. / 3.64
