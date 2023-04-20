const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

// Connect to MongoDB
//mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// User schema
const User = require('../schemas/user-schema.js'); // Import User model from user-schema.js

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ username, password });

    if (foundUser) {
      res
        .cookie('meeple', 'beeple', { httpOnly: true }) //this doesn't send
        .send({ status: 'success', message: 'Logged in successfully', token });
    } else {
      res.status(401).send({ status: 'error', message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

router.post('/register', async (req, res) => {
  console.log('Register route called');
  const { username, email, password } = req.body; // Add email to the destructuring
  console.log('Request body:', req.body);

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
      items: {
        item_id: 0,
        number_owned: 0,
        expiration_date: Date.now()
      },
      sets: [],
      history: [],
      dailyquizHistory: []
    };

    console.log('New user object:', newUser);

    const createdUser = await User.create(newUser);
    console.log('User created:', createdUser);
    res.send({ status: 'success', message: 'User registered successfully' });
  } catch (err) {
    console.error('Error caught in catch block:', err);
    res.status(500).send('Internal server error');
  }
});

router.post('/logout', (req, res) => {
  res.send({ message: 'Logged out!' });
});

module.exports = router;

