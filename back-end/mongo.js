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
    password: 'primary!@#'
  });
  await primaryUser.save();

  const secondaryUser = new User({
    username: 'secondary',
    password: 'secondary!@#'
  });
  await secondaryUser.save();

  console.log('All Users: ', await User.find({}));

  console.log(
    "Finding a user with username 'primary': ",
    await User.findOne({ username: 'primary' })
  );

}

main();