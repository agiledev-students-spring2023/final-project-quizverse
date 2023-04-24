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
    // Validate if user exist in our database
    if (foundUser) {
      // Create token
      const token = jwt.sign({ user_id: foundUser._id, username }, process.env.JWT_SECRET);
      const info = {
        username: username,
        token: token
      };
      // Save token within the user object
      //foundUser.token = token;
      // Sending the entire user object
      //res.status(200).json(foundUser);
      //Send just the token (and username for reference)
      res.status(200).json(info);
      // res
      //   .cookie('meeple', 'beeple', { httpOnly: true }) //this doesn't send
      //   .send({ status: 'success', message: 'Logged in successfully' });
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
      items: [],
      sets: [],
      history: [],
      dailyquizHistory: []
    };

    //console.log('New user object:', newUser);

    const createdUser = await User.create(newUser);
    console.log('User created:', createdUser);
    // Create token
    const token = jwt.sign({ user_id: createdUser._id, email }, process.env.JWT_SECRET);
    // save user token
    createdUser.token = token;
    await createdUser.save();
    // return new user
    //Send just the token :o
    res.status(200).json(token)
    console.log(createdUser);
    
  } catch (err) {
    console.error('Error caught in catch block:', err);
    res.status(500).send('Internal server error');
  }
});

router.post('/logout', (req, res) => {
  res.send({ message: 'Logged out!' });
});

module.exports = router;

