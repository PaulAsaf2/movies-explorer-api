const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorized');
const NotFoundError = require('../errors/unauthorized');
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
    const existUser = await User
      .findOne({ email })
      .orFail(new UnauthorizedError('Неверная почта или пароль'))
      .select('+password');
    const matched = await bcrypt.compare(password, existUser.password);
    if (!matched) {
      return next(new UnauthorizedError('Неверная почта или пароль'));
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
// ----------------------------------------------------
const getUser = async (req, res) => {
  const user = await User
    .findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'));

  res.send(user);
};
// ----------------------------------------------------
const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  let updatedUser;
  try {
    updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
      },
      {
        new: true,
        runValidators: true,
      },
    );
  } catch (err) {
    return next(err);
  }
  return res.json(updatedUser);
};

module.exports = {
  createUser,
  signin,
  signout,
  getUser,
  updateUser,
};
