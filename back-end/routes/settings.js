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
    const emailData = req.body.email;
    let user = req.headers.username;
    //code section 1
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
router.post('/delete', (req, res) => {
  let user = req.headers.username;
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
