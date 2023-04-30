// test/test_helper.js
  
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;
  
// tells mongoose to use ES6 implementation of promises
mongoose.Promise = global.Promise;
mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DB}.zkgvem0.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => {
    console.log(err);
    console.log('Have you set up your .env file?');
  });
  
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ', error);
    });
      
    // runs before each test
    beforeEach((done) => {
        mongoose.connection.collections.users.drop(() => {
        done();
       });
});