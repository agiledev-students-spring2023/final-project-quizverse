// router responsible for settings
const express = require('express');

const router = express.Router();

router.post('/settings-email', (req, res) => {
  res.send('Email Updated!');
  const email = req.body.email;
  res.send(email);
});
router.post('/settings-password', (req, res) => {
  res.send('Password Updated!');
  const password = req.body.password;
  res.send(password);
});
router.get('/items', (req, res) => {
  res.send('Here are your items:');
  const items = {
    item1: 'Double Coins!',
    item2: 'Triple Coins!',
    item3: 'Streak Freeze!',
    item4: 'Streak Protection!'
  };
  if (!Object.keys(items).length) {
    console.log('no data found');
    res.send('Whoops! You have no items.');
  } else {
    res.json(items);
  }
});
router.get('/study-stats', (req, res) => {
  res.send('Your study statistics:');
  const words = {
    mostMissed1: 'banana',
    mostMissed2: 'canoe',
    mostMissed3: 'The depths of the abyss'
  };
  if (!Object.keys(words).length) {
    console.log('no data found');
    res.send('Whoops! You have no study statistics. Go study to get some!');
  } else {
    res.json(words);
  }
});
router.post('/delete', (req, res) => {
  res.send('Your account has been deleted!');
  //contact database and delete account information
});

module.exports = router;
