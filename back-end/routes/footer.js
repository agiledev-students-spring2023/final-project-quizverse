// router responsible for the footer
const express = require('express');
const router = express.Router();
const jwt_auth = require('./jwt');

router.get('/terms', jwt_auth, (req, res) => {
  res.send({ data: 'Terms of Service!' });
});
router.get('/privacy', jwt_auth, (req, res) => {
  res.send({ data: 'Privacy Policy!' });
});

module.exports = router;
