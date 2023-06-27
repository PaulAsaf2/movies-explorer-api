const { emailExistError, serverError } = require('../utils/config');

const handleError = ((err, req, res, next) => {
  if (err.code === 11000) {
    res.status(409).json({ message: emailExistError });
  } else if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  res.status(500).json({ message: serverError });

  return next();
});

module.exports = handleError;
