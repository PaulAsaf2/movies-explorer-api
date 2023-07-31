require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized');
const { developmentKey } = require('../utils/config');
const { authorisationError } = require('../utils/constants');

const auth = async (req, res, next) => {
  let payload;
  try {
    const token = await req.cookies.jwt;
    console.log(token);
    payload = await jwt.verify(token, JWT_SECRET || developmentKey);
    console.log(payload);
    req.user = payload;
  } catch {
    return next(new UnauthorizedError(authorisationError));
  }

  return next();
};

module.exports = { auth };
