const { ValidationError, CastError } = require('mongoose').Error;
const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFound');
const Forbidden = require('../errors/forbidden');
const BadRequest = require('../errors/badRequest');
const {
  createFilmError,
  notFoundFilmes,
  notFoundFilm,
  incorrectIdFilm,
  movieDeletionError,
  succesDeleteFilm,
} = require('../utils/constants');
// ----------------------------------------------------
const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie
      .find({})
      .orFail(new NotFoundError(notFoundFilmes))
      .populate('owner');

    return res.json(movies);
  } catch (err) {
    return next(err);
  }
};
// ----------------------------------------------------
const createMovie = async (req, res, next) => {
  let newMovie;
  try {
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
  } catch (err) {
    if (err instanceof ValidationError) {
      return next(new BadRequest(createFilmError));
    }
    return next(err);
  }

  return res.json(newMovie);
};
// ----------------------------------------------------
const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie
      .findById(req.params.id)
      .orFail(new NotFoundError(notFoundFilm));

    if (movie.owner.toString() !== req.user._id) {
      return next(new Forbidden(movieDeletionError));
    }

    movie.deleteOne();
  } catch (err) {
    if (err instanceof CastError) {
      return next(new BadRequest(incorrectIdFilm));
    }
    return next(err);
  }

  return res.json({ message: succesDeleteFilm });
};
// ----------------------------------------------------
module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
