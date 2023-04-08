const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

// import the routes for authentication (login / register)
const authRouter = require('./routes/auth');
const settingsRouter = require('./routes/settings');
const footerRouter = require('./routes/footer');
const dailyQuizRouter = require('./routes/daily-quiz');
const createSetRouter = require('./routes/create-set');
const flashcardRouter = require('./routes/flashcards');
const flashcardSetsRouter = require('./routes/flashcard-sets');
const editSetRouter = require('./routes/edit-set');

const app = express(); // instantiate an Express object
const port = 3001; // the port to listen to for incoming requests
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data
app.use(cors(corsOptions));

// app.get('/', (req, res) => {
//   res.send('Hello!');
// });

// app.get('/test', (req, res) => {
//   res.send({
//     monkey: 'goose',
//     canada: 'maple leaf'
//   });
// });

app.use(authRouter);
app.use(settingsRouter);
app.use(footerRouter);
app.use(dailyQuizRouter);
app.use(flashcardRouter);
app.use(createSetRouter);
app.use(editSetRouter);
app.use(flashcardSetsRouter);

// call express's listen function to start listening to the port
const listener = app.listen(port, function () {
  console.log(`Server running on port: ${port}`);
});

// a function to stop listening to the port
const close = () => {
  listener.close();
};

module.exports = app;