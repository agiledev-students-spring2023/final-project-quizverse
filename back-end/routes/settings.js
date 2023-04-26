// router responsible for settings
const express = require('express');
const User = require('../schemas/user-schema');
const router = express.Router();
const jwt_auth = require('./jwt');
const { check, validationResult } = require('express-validator');

router.post(
  '/settings-email',
  [check('email').isEmail().withMessage('Not a valid email address')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    //res.send('Email Updated!');
    //for tester purposes this post request also generates a new anna
    const emailData = req.body.email;
    let user = req.headers.username;
    // try {
    //   const user = User.create({
    //     username: 'Anna',
    //     email: 'anna@money.com',
    //     password: 'make a killing'
    //   })
    //     .then((username) => {
    //       console.log(`Generated new ${username}`);
    //     })
    //     .catch((err) => {
    //       console.log(`Failure: ${err}`);
    //     });
    //   console.log(user);
    // } catch (e) {
    //   console.log(e.message);
    // }
    try {
      const filter = { username: user };
      const update = { email: emailData };
      User.findOneAndUpdate(filter, update, {
        new: true
      })
        .then((emailData) => {
          // console.log(`saved ${emailData}`); //printing the user object
          // console.log(`saved ${user.email}`); //printing undefined
        })
        .catch((err) => {
          console.log(`Failure: ${err}`);
        });
    } catch (e) {
      console.log(e.message);
    }
    res.send({ email: emailData });
  }
);
router.post(
  '/settings-password',
  [
    check('password')
      .notEmpty()
      .withMessage('Password cannot be empty')
      .isLength({ min: 4 })
      .withMessage('Password needs to be at least 4 characters long')
  ],
  async (req, res) => {
    //res.send('Password Updated!');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let user = req.headers.username;
    const passwordData = req.body.password;
    const filter = { username: user };
    const update = { password: passwordData };
    User.findOneAndUpdate(filter, update, {
      new: true
    })
      .then((passwordData) => {
        // console.log(`saved ${passwordData}`); //printing the user object
        // console.log(`saved ${user.passwordData}`); //printing undefined
      })
      .catch((err) => {
        console.log(`Failure: ${err}`);
      });
    res.send({ password: passwordData });
  }
);
// router.get('/items', (req, res) => {
//   //res.send('Here are your items:');
//   const items = {
//     item1: 'Double Coins!',
//     item2: 'Triple Coins!',
//     item3: 'Streak Freeze!',
//     item4: 'Streak Protection!'
//   };
//   if (!Object.keys(items).length) {
//     console.log('no data found');
//     res.send({ item: 'Whoops! You have no items.' });
//   } else {
//     res.json(items);
//   }
// });
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
  let user = req.headers.username
  const filter = { username: user };
  User.findOneAndDelete(filter)
    .then(() => {
      // console.log(`Deleted account under username ${filter.username}`); //printing the user object
    })
    .catch((err) => {
      console.log(`Failure: ${err}`);
    });
  res.send({ message: 'Your account has been deleted!' });
  //contact database and delete account information
});

module.exports = router;
