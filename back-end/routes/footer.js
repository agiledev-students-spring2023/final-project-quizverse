// router responsible for the footer
const express = require('express');

const router = express.Router();

router.get('/terms', (req, res) => {
  res.send('Terms of Service!');
});
function test(req, res) {
  router.get('/privacy', (req, res) => {
    res.send('Privacy Policy!');
  });
}
router.get('/privacy', (req, res) => {
  res.send('Privacy Policy!');
});

module.exports = router;
