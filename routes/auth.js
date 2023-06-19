const express = require('express');
const { createUser, signin } = require('../controllers/users');

const router = express.Router();

router.post('/signup', createUser);
router.post('/signin', signin);
router.post('/signout');

module.exports = router;
