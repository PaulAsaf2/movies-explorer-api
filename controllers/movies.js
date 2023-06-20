/* eslint-disable max-len */
const Movie = require('../models/movie');

const getMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find({});
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

module.exports = {
  createMovie,
  getMovies,
};

// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image, trailer, nameRU,
// nameEN и thumbnail, movieId
// POST /movies

// country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
