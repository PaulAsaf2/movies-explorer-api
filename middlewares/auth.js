require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized');
const { authorisationError, developmentKey } = require('../utils/config');

const auth = async (req, res, next) => {
  let payload;
  try {
    const token = await req.cookies.jwt;
    payload = await jwt.verify(token, JWT_SECRET || developmentKey);
    req.user = payload;
  } catch {
    return next(new UnauthorizedError(authorisationError));
  }

  return next();
};

module.exports = { auth };
