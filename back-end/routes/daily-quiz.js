//Routing for all of Daily Quiz Things
const express = require('express');
const axios = require('axios');
const router = express.Router();
const jwt_auth = require('./jwt');
const {FlashcardSet, Flashcard} = require('../schemas/flashcard-set-schema');
const User = require('../schemas/user-schema');
const DailyQuizHistory = require('../schemas/dailyquizHistory-schema');
const { check, validationResult, body } = require('express-validator');

const History = require('../schemas/history-schema');
const _ = require('underscore');

router.get('/daily-quiz', jwt_auth, async (req, res, next) => {
  // use axios to make a request to an API for flashcard data in the daily quiz
  user = req.headers.username;
  User.findOne({ username: req.headers.username })
    .populate('sets')
    .then((u) => {
      let all_flashcards = [];
      let test = u.sets.map((set) => {
        set.flashcards.map((flashcard) => {
          all_flashcards.push({
            term: flashcard.term,
            definition: flashcard.definition,
            set_id: set._id
          });
        });
      });
      //NOTE: Cut our flashcards down to 10 for the daily quiz. We could try and customize this later.
      if (all_flashcards.length > 10) {
        all_flashcards = _.sample(all_flashcards, 10);
      }
      //RANDOMIZE the order of our daily quiz flashcards.
      //If someone wants to implement an algorithm, feel free to do so here.
      all_flashcards = _.shuffle(all_flashcards);
      res.json(all_flashcards).status(200);
    });
});
// Creating a POST request for daily quiz
router.post(
  '/study-stats',
  body().isEmpty().withMessage('Body of request is empty'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let correct = req.body.correct;
    let incorrect = req.body.incorrect;
    const username = req.headers.username;
    let answers = [];
    correct.map((o) => {
      answers.push({
        term: o.term,
        set_id: o.set_id,
        correctness: true
      });
    });
    incorrect.map((o) => {
      answers.push({
        term: o.term,
        set_id: o.set_id,
        correctness: false
      });
    });

    let todays_stats = new DailyQuizHistory({
      dayOfQuiz: new Date(),
      percentageCorrect: correct.length / Math.max(correct.length + incorrect.length, 10),
      answers: answers
    });

    try {
      todays_stats.save();
    } catch (err) {
      console.log('error when saving new set' + err);
      res.status(500).send({ message: 'error' });
    }

    User.findOne({ username: req.headers.username }).then((u) => {
      let combinedHistory = [...u.dailyquizHistory, todays_stats];
      let c = u.coins;
      User.findOneAndUpdate(
        { username: req.headers.username },
        {
          dailyquizHistory: combinedHistory,
          coins: c + correct.length, //this coins algorithm is good for final product
          streak: u.streak + 1
        }, //UPDATE streak mechanism before end of sprint 4
        { new: true }
      ).then((u) => {
        console.log(`updated user: ${u}`);
      });
    });
    /*
     * Now dealing with history schema. THIS DOES NOT WORK. Not sure how to fix this.
     */
    User.findOne({ username: req.headers.username }).then((u) => {
      let history = u.history;
      let found = false;
      answers.map((answer) => {});
    });

    /*
     * Dealing with the dailyquizHistory-schema first
     */

    // axios
    //   .post('https://my.api.mockaroo.com/generic_post.json?key=6b3bc3e0&__method=POST', req.body)
    //   .then(console.log('Succesfully sent to database'))
    //   .catch((err) => next(err));
    const data = {
      status: 'Amazing success!',
      message: 'Congratulations on sending us this data!',
      your_data: req.body
    };
    // ... then send a response of some kind to client
    res.json(data);
  }
);

module.exports = router;
