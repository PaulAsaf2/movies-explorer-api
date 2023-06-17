const express = require('express');

const router = express.Router();

// movies routes: '/movies'
router.get('/', (req, res) => {
  res.send();
});
router.post('/', (req, res) => {
  res.send();
});
router.delete('/:id', (req, res) => {
  res.send();
});

module.exports = router;
