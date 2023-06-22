const express = require('express');
const { getUser, updateUser } = require('../controllers/users');

const router = express.Router();

router.route('/me')
  .get(getUser)
  .patch(updateUser);

module.exports = router;
