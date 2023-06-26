const express = require('express');
const { getUser, updateUser } = require('../controllers/users');
const { userUpdateValidation } = require('../middlewares/validation');

const router = express.Router();

router.route('/me')
  .get(getUser)
  .patch(userUpdateValidation, updateUser);

module.exports = router;
