const handleError = ((err, req, res, next) => {
  if (err.code === 11000) {
    return res.json({ message: 'Электронная почта занята' });
  }
  res.json(err);

  return next();
});

module.exports = handleError;
