require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// ----------------------------------------------------
const { NODE_ENV, JWT_SECRET } = process.env;
const { ValidationError } = require('mongoose').Error;
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorized');
const NotFoundError = require('../errors/unauthorized');
const BadRequest = require('../errors/badRequest');
const {
  incorrectAuthorisationData,
  userCreated,
  successfulExit,
  userNotFound,
  registrationError,
  updateUserError,
  developmentKey,
} = require('../utils/constants');
// ----------------------------------------------------
const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash });
  } catch (err) {
    if (err instanceof ValidationError) {
      return next(new BadRequest(registrationError));
    }
    return next(err);
  }

  return res.json({ message: userCreated });
};
// ----------------------------------------------------
const signin = async (req, res, next) => {
  const { email, password } = req.body;
  let token;

  try {
    const existUser = await User
      .findOne({ email })
      .orFail(new UnauthorizedError(incorrectAuthorisationData))
      .select('+password');

    const matched = await bcrypt
      .compare(password, existUser.password);

    if (!matched) {
      return next(new UnauthorizedError(incorrectAuthorisationData));
    }

    token = await jwt.sign(
      { _id: existUser._id },
      (NODE_ENV === 'production') ? JWT_SECRET : developmentKey,
      { expiresIn: '7d' },
    );
  } catch (err) { return next(err); }

  return res
    .cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    })
    .json({ logged: true });
};
// ----------------------------------------------------
const signout = (req, res) => {
  res
    .clearCookie('jwt')
    .send({ message: successfulExit });
};
// ----------------------------------------------------
const getUser = (req, res, next) => {
  User.findById(req.params.id || req.user._id)
    .then((user) => {
      if (!user) { return next(new NotFoundError(userNotFound)); }
      return res.send(user);
    })
    .catch(next);
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
    if (err instanceof ValidationError) {
      return next(new BadRequest(updateUserError));
    }
    return next(err);
  }

  return res.json(updatedUser);
};
// ----------------------------------------------------
module.exports = {
  createUser,
  signin,
  signout,
  getUser,
  updateUser,
};
