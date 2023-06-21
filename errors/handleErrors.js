const { emailExistError } = require('../config');
const { CONFLICT } = require('../config');

const handleError = ((err, req, res, next) => {
  if (err.code === 11000) {
    res.status(CONFLICT).json({ message: emailExistError });
  } else if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  res.json(err);

  return next();
});

module.exports = handleError;
