/* eslint-disable max-len */
import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    // match: [checkURL, 'Некорректная ссылка'],
  },
  trailerLink: {
    type: String,
    required: true,
    // match: [checkURL, 'Некорректная ссылка'],
  },
  thumbnail: {
    type: String,
    required: true,
    // match: [checkURL, 'Некорректная ссылка'],
  },
  owner: {
    type: ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: ObjectId,
    ref: 'film',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    // match: [checkRU, 'Название содержит некирилличиские символы'],
  },
  nameEN: {
    type: String,
    required: true,
    // match: [checkRU, 'Название содержит нелатинские символы'],
  },
});

export default movieSchema;

// country — страна создания фильма. Обязательное поле-строка.
// director — режиссёр фильма. Обязательное поле-строка.
// duration — длительность фильма. Обязательное поле-число.
// year — год выпуска фильма. Обязательное поле-строка.
// description — описание фильма. Обязательное поле-строка.
// image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
// trailerLink — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
// thumbnail — миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом.
// owner — _id пользователя, который сохранил фильм. Обязательное поле.
// movieId — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле в формате number.
// nameRU — название фильма на русском языке. Обязательное поле-строка.
// nameEN — название фильма на английском языке. Обязательное поле-строка.