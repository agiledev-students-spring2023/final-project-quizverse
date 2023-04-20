const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const User = require('../schemas/user-schema.js');

const usersFilePath = path.join(__dirname, '../public/users.json');
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }

    //const users = JSON.parse(data);
    //const user = users.find((user) => user.username === username && user.password === password);
    const user = User.findOne({ username: username }).exec();

    if (user) {
      // user found and password is correct... send a success response
      console.log('User logged in successfully.');
      console.log(user);
      const token = user.generateJWT(); // generate a signed token
      res.json({
        success: true,
        message: 'User logged in successfully.',
        token: token,
        username: user.username
      }); // send the token to the client to store
      //res.send({ status: 'success', message: 'Logged in successfully' });
    } else {
      res.status(401).send({ status: 'error', message: 'Invalid username or password' });
    }
  });
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }

    const users = JSON.parse(data);
    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
      res.status(400).send({ status: 'error', message: 'Username already exists' });
      return;
    }

    users.push({ username, password });
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
        return;
      }

      res.send({ status: 'success', message: 'User registered successfully' });
    });
  });
});
router.post('/logout', (req, res) => {
  res.send({ message: 'Logged out!' });
});

module.exports = router;
