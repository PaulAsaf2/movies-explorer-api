const express = require('express');
const { getUser, updateUser } = require('../controllers/users');
const { userUpdateValidation } = require('../middlewares/validation');

const router = express.Router();

router.get('/me', getUser);
router.patch('/me', userUpdateValidation, updateUser);

module.exports = router;
