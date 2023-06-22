const express = require('express');
const NotFoundError = require('../errors/notFound');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const authRoutes = require('./auth');
const { auth } = require('../middlewares/auth');
const { pageNotFound } = require('../config');

const router = express.Router();

router.use('/', authRoutes);
router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);

router.all('*', auth, (req, res, next) => next(
  new NotFoundError(pageNotFound),
));

module.exports = router;
