const express = require('express');

const router = express.Router();
const { createUser, signin, signout } = require('../controllers/users');
const {
  signupValidation, signinValidation,
} = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, signin);
router.get('/signout', auth, signout);

module.exports = router;
