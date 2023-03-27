// router responsible for settings
const express = require('express');

const router = express.Router();

router.post('/settings', (req, res) => {
  res.send('Settings!');
});

module.exports = router;
