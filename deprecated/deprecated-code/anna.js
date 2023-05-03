//currently not working, test file to generate a new anna
const express = require('express');
const User = require('../../back-end/schemas/user-schema');
const router = express.Router();
try {
  const user = User.create({
    username: 'Anna',
    email: 'anna@money.com',
    password: 'make a killing'
  })
    .then((username) => {
      console.log(`Generated new ${username}`);
    })
    .catch((err) => {
      console.log(`Failure: ${err}`);
    });
  console.log(user);
} catch (e) {
  console.log(e.message);
}
