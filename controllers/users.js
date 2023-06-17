const bcrypt = require('bcrypt');
const User = require('../models/user');

const handleNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash });
  } catch (err) {
    return next(err);
  }
  return res.json({ message: 'Пользователь успешно создан' });
};

module.exports = {
  handleNewUser,
};
