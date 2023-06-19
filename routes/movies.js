const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send();
});
router.post('/', (req, res) => {
  res.send();
});
router.delete('/:id', (req, res) => {
  res.send();
});

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
