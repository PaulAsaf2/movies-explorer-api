/* eslint-disable max-len */
const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFound');
const Forbidden = require('../errors/forbidden');

const getMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie
      .find({})
      .populate('owner');
  } catch (err) {
    return next(err);
  }
  return res.json(movies);
};

const createMovie = async (req, res, next) => {
  let newMovie;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    });
    const newMovieId = movie._id.toString();
    newMovie = await Movie
      .findById(newMovieId)
      .populate('owner');
  } catch (err) { return next(err); }

  return res.json(newMovie);
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie
      .findById(req.params.id)
      .orFail(new NotFoundError('Карточка не найдена'));
    if (movie.owner.toString() !== req.user._id) {
      return next(new Forbidden('Нельзя удалить из избранного чужой фильм'));
    }
    movie.deleteOne();
  } catch (err) { return next(err); }

  return res.json({ message: 'Фильм удалён из избранного' });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};

// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image, trailer, nameRU,
// nameEN и thumbnail, movieId
// POST /movies

// country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
