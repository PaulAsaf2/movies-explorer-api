const express = require('express');
const { handleNewUser } = require('../controllers/users');

const router = express.Router();

router.post('/signup', handleNewUser);
router.post('/signin');
router.post('/signout');

module.exports = router;
