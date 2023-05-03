const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const {check, validationResult} = require('express-validator');
const User = require('../schemas/user-schema.js');
require('dotenv').config();

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

// Connect to MongoDB mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:
// true, useUnifiedTopology: true }); User schema

router.post('/login', [
    check('username')
        .notEmpty()
        .withMessage('Username cannot be empty'),
    check('password')
        .notEmpty()
        .withMessage('Password cannot be empty')
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({
                errors: errors.array()
            });
    }
    const {username, password} = req.body;
    try {
        const foundUser = await User.findOne({username, password});
        // Validate if user exist in our database
        if (foundUser) {
            // Create token
            const token = jwt.sign({
                user_id: foundUser._id,
                username
            }, process.env.JWT_SECRET);
            const info = {
                username: username,
                token: token
            };
            res
                .status(200)
                .json(info);
        } else {
            res
                .status(401)
                .send({status: 'error', message: 'Invalid username or password'});
        }
    } catch (err) {
        console.error(err);
        res
            .status(500)
            .send('Internal server error');
    }
});

router.post(
  '/register',
  [
    check('username')
      .notEmpty()
      .withMessage('Username cannot be empty')
      .isLength({ min: 4 }) //
      .withMessage('Username needs to be at least 4 characters long'),
    check('password')
      .notEmpty()
      .withMessage('Password cannot be empty')
      .isLength({ min: 4 })
      .withMessage('Password needs to be at least 4 characters long')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    const { username, password } = req.body; // Add email to the destructuring
    // console.log('Request body:', req.body);
    try {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        console.log('Username already exists');
        res.status(400).send({ status: 'error', message: 'Username already exists' });
        return;
      }

      const newUser = {
        username,
        email: username, // Assuming the email is the same as the username
        password,
        streak: 0,
        coins: 0,
        items: [],
        sets: [],
        history: [],
        dailyquizHistory: [],
        inventory: [
          {
            item_id: 1,
            item_name: 'Double Coins',
            item_desc: 'Double your coins when studying! :D'
          },
          {
            item_id: 2,
            item_name: 'Streak Freeze',
            item_desc: 'Protect your streak from forgetting to study for a day. A nice safety net!'
          }
        ]
      };
      const createdUser = await User.create(newUser);
      // Create token
      const token = jwt.sign(
        {
          user_id: createdUser._id,
          username
        },
        process.env.JWT_SECRET
      );
      // save user token
      await createdUser.save();
      res.status(200).json({
        status: 'success',
        message: 'User registered and logged in',
        token: token,
        user: {
          username: createdUser.username,
          email: createdUser.email
          // Add any other necessary user information you want to send
        }
      });
    } catch (err) {
      console.error('Error caught in catch block:', err);
      res.status(500).send('Internal server error');
    }
  }
);

router.post('/logout', (req, res) => {
    res.send({message: 'Logged out!'});
});

module.exports = router;
