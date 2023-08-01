require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized');
const { developmentKey } = require('../utils/config');
const { authorisationError } = require('../utils/constants');

const auth = (req, res, next) => {
  let payload;
  const token = req.cookies.jwt;

  try {
    payload = jwt.verify(token, (JWT_SECRET || developmentKey));
  } catch {
    return next(new UnauthorizedError(authorisationError));
  }

  req.user = payload;
  return next();
};

module.exports = { auth };
