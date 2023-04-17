//THIS IS TESTER CODE, NOT ACTUALLY PART OF QUIZVERSE
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./schemas/user-schema');

dotenv.config();

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;

// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
async function main() {
  await mongoose.connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DB}.zkgvem0.mongodb.net/?retryWrites=true&w=majority`
  );
  const primaryUser = new User({
    username: 'primary',
    email: 'primaryuser@gmail.com',
    password: 'primary!@#'
  });

  const secondaryUser = new User({
    username: 'secondary',
    email: 'secondaryuser@gmail.com',
    password: 'secondary!@#'
  });

  console.log('All Users: ', await User.find({}));

  if (!(await User.findOne({ username: 'primary' }))) {
    await primaryUser.save();
  }

  if (!(await User.findOne({ username: 'secondary' }))) {
    await secondaryUser.save();
  }

  console.log(
    "Finding a user with username 'primary': ",
    await User.findOne({ username: 'primary' })
  );
}

main();
