const express = require('express');
const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies');
const { createMovieValidation } = require('../middlewares/validation');

const router = express.Router();

router.get('/', getMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
