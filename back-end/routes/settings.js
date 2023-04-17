// router responsible for settings
const express = require('express');
const User = require('../schemas/user-schema');
const router = express.Router();
router.post('/settings-email', (req, res) => {
  //res.send('Email Updated!');
  const emailData = req.body.email;
  try {
    const user = User.create({
      username: 'Anna',
      email: emailData,
      password: 'password'
    })
      .then((email) => {
        console.log(`saved ${email}`);
      })
      .catch((err) => {
        console.log(`Failure: ${err}`);
      });
    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
  res.send({ email: emailData });
});
router.post('/settings-password', (req, res) => {
  //res.send('Password Updated!');
  const passwordData = req.body.password;
  const user = User.find({ name: 'Anna' })
    .limit(1)
    .then((passwordData) => {
      console.log(`saved ${passwordData}`);
    })
    .catch((err) => {
      console.log(`Failure: ${err}`);
    });
  res.send({ password: passwordData });
});
router.get('/items', (req, res) => {
  //res.send('Here are your items:');
  const items = {
    item1: 'Double Coins!',
    item2: 'Triple Coins!',
    item3: 'Streak Freeze!',
    item4: 'Streak Protection!'
  };
  if (!Object.keys(items).length) {
    console.log('no data found');
    res.send({ item: 'Whoops! You have no items.' });
  } else {
    res.json(items);
  }
});
router.get('/study-stats', (req, res) => {
  //res.send('Your study statistics:');
  const words = {
    mostMissed1: 'banana',
    mostMissed2: 'canoe',
    mostMissed3: 'The depths of the abyss'
  };
  if (!Object.keys(words).length) {
    console.log('no data found');
    res.send({ mostMissed: 'Whoops! You have no study statistics. Go study to get some!' });
  } else {
    res.json(words);
  }
});
router.post('/delete', (req, res) => {
  res.send({ message: 'Your account has been deleted!' });
  //contact database and delete account information
});

module.exports = router;
