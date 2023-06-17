const express = require('express');

const router = express.Router();

// users routes: '/users'
router.get('/me', (req, res) => {
  res.send('users/me GET route');
});
router.patch('/me', (req, res) => {
  res.send('users/me PATCH route');
});

module.exports = router;
