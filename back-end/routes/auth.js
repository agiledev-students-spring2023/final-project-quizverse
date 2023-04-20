const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// Connect to MongoDB
//mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// User schema
const User = require('../schemas/user-schema.js'); // Import User model from user-schema.js

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const foundUser = User.findOne({ username, password }).then(() => console.log('lol'));

    if (foundUser) {
      console.log('We are in bois');
      const token = jwt.sign({ foundUser }, process.env.JWT_SECRET);
      console.log(token);
      res.cookie('Anna!', token, { httpOnly: true });
      //res.send({ status: 'success', message: 'Logged in successfully' });
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
