const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken")

const app = express(); // instantiate an Express object
dotenv.config();

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;
const PORT = process.env.PORT; // the port to listen to for incoming requests
const FRONTEND = process.env.REACT_APP_FRONTEND;

// import the routes for authentication (login / register)
const authRouter = require('./routes/auth');
const settingsRouter = require('./routes/settings');
const footerRouter = require('./routes/footer');
const { dailyQuizRouter } = require('./routes/daily-quiz');
const { createSetRouter } = require('./routes/create-set');
const flashcardRouter = require('./routes/flashcards');
const flashcardSetsRouter = require('./routes/flashcard-sets');
const editSetRouter = require('./routes/edit-set');
const homeRouter = require('./routes/home');
const itemsRouter = require('./routes/items');
const shopRouter = require('./routes/shop');

const corsOptions = {
  origin: `${FRONTEND}`,
  credentials: true,
  optionsSuccessStatus: 200
};
//db
mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DB}.zkgvem0.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => {
    console.log(err);
    console.log('Have you set up your .env file?');
  });

mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`);
});
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data
app.use(cors(corsOptions));
app.use('/static', express.static('public'));

app.use(authRouter);
app.use(settingsRouter);
app.use(footerRouter);
app.use(dailyQuizRouter);
app.use(flashcardRouter);
app.use(createSetRouter);
app.use(editSetRouter);
app.use(flashcardSetsRouter);
app.use(homeRouter);
app.use(itemsRouter);
app.use(shopRouter);
app.use(cookieParser());

// call express's listen function to start listening to the port
const listener = app.listen(PORT, function () {
  console.log(`Server running on port: ${PORT}`);
});

// a function to stop listening to the port
const close = () => {
  console.log('server is closed');
  listener.close();
};
module.exports = app;
