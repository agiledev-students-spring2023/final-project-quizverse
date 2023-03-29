const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')
const axios = require("axios")

// import the routes for authentication (login / register)
const authRouter = require('./routes/auth')
const settingsRouter = require('./routes/settings');
const footerRouter = require('./routes/footer');

const app = express(); // instantiate an Express object
const port = 3001; // the port to listen to for incoming requests

app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/test', (req, res) => {
  res.send({
    monkey: 'goose',
    canada: 'maple leaf'
  });
});

app.get("/daily-quiz", (req, res, next) => {
  // use axios to make a request to an API for flashcard data in the daily quiz
  axios
    .get("https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0")
    .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
    .catch(err => next(err)) // pass any errors to express
})

app.post()

app.use(authRouter);
app.use(settingsRouter);
app.use(footerRouter);


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