const express = require('express');
const { getUser, updateUser } = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validation');

const router = express.Router();

router.get('/me', getUser);
router.patch('/me', updateUser, updateUserValidation);

module.exports = router;
