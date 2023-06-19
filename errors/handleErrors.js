const handleError = ((err, req, res, next) => {
  if (err.code === 11000) {
    res.json({ message: 'Электронная почта занята' });
  } else if (err.statusCode) {
    return res.status(401).send({ message: err.message });
  }
  res.json(err);

  return next();
});

module.exports = handleError;
