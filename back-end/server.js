const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')

// import the routes for authentication (login / register)
const authRouter = require('./routes/auth')

const app = express(); // instantiate an Express object
const port = 3001; // the port to listen to for incoming requests

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/test', (req, res) => {
  res.send({
    monkey: 'goose',
    canada: 'maple leaf'
  });
});

app.use(authRouter)


// call express's listen function to start listening to the port
const listener = app.listen(port, function () {
  console.log(`Server running on port: ${port}`);
});

// a function to stop listening to the port
const close = () => {
  listener.close();
};

module.exports = {
  close: close
};