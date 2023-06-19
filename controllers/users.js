const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorized');
// ----------------------------------------------------
const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash });
  } catch (err) {
    return next(err);
  }

  return res.json({ message: 'Пользователь успешно создан' });
};
// ----------------------------------------------------
const signin = async (req, res, next) => {
  const { email, password } = req.body;
  let token;

  try {
    const existUser = await User.findOne({ email }).select('+password');
    if (!existUser) {
      return next(new UnauthorizedError('Неверная почта'));
    }
    const matched = await bcrypt.compare(password, existUser.password);
    if (!matched) {
      return next(new UnauthorizedError('Неверный пароль'));
    }

    token = await jwt.sign(
      { _id: existUser._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
  } catch (err) { return next(err); }

  return res
    .cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    })
    .json({ message: 'Успешный вход' });
};

const signout = (req, res) => {
  res
    .clearCookie('jwt')
    .send({ message: 'Успешный выход из учётной записи' });
};

module.exports = {
  createUser,
  signin,
  signout,
};
