const express = require('express');

const router = express.Router();
const { createUser, signin, signout } = require('../controllers/users');
const {
  signupValidation, signinValidation,
} = require('../middlewares/validation');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, signin);
router.get('/signout', signout);

module.exports = router;
