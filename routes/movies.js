const express = require('express');
const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies');

const router = express.Router();

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
