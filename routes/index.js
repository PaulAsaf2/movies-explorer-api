const express = require('express');
const NotFoundError = require('../errors/notFound');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const authRoutes = require('./auth');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.use('/', authRoutes);
router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);

router.all('*', auth, (req, res, next) => next(
  new NotFoundError('Страницы не существует'),
));

module.exports = router;
