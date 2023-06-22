const express = require('express');
const { getUser, updateUser } = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validation');

const router = express.Router();

router.route('/me')
  .get(getUser)
  .patch(updateUserValidation, updateUser);

module.exports = router;
