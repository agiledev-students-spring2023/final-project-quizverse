// router responsible for the footer
const express = require('express');

const router = express.Router();

router.get('/terms', (req, res) => {
  res.send('Terms of Service!');
});
router.get('/privacy', (req, res) => {
  res.send('Privacy Policy!');
});

module.exports = router;
