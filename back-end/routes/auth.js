const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const usersFilePath = path.join(__dirname, '../public/users.json');
/* istanbul ignore next */
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }
    const users = JSON.parse(data);
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (foundUser) {
      res.send({ status: 'success', message: 'Logged in successfully' });
    } else {
      res.status(401).send({ status: 'error', message: 'Invalid username or password' });
    }
  });
});

/* istanbul ignore next */
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
/* istanbul ignore next */
router.post('/logout', (req, res) => {
  res.send('Logout');
});

module.exports = router;
