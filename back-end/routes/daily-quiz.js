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

router.get('/daily-quiz', jwt_auth, async (req, res) => {
  // use axios to make a request to an API for flashcard data in the daily quiz
  // declare that we're going to fetch 10 flashcards, could be customized later
  const dqLength = 10;
  // if wrong, set to 0 again
  // otherwise, increment priority and sort in ascending priority
  const username = req.headers.username;
  try {
    // object used to track each term and their relative priority
    let mlpq = {};

    // first find all of the user's history, then sort by their lastest to most recent quiz
    DailyQuizHistory.aggregate([{ $match: { username } }, { $sort: { dayOfQuiz: 1 } }]).then(
      (histories) => {
        console.log(histories);
        // if the user has a history, proceed to populate mlpq
        if (histories.length >= 1) {
          histories.forEach((history) => {
            history.answers.forEach((card) => {
              // identify each card by its term and def to distinguish same term with multiple defs
              const cardId = card.term + card.definition;
              // if correct, increase its score to indicate a lower priority
              if (card.correctness) {
                if (mlpq.hasOwnProperty(cardId)) {
                  mlpq[cardId].priority = mlpq[cardId].priority + 1;
                } else {
                  console.log(card);
                  const newCard = {
                    info: { term: card.term, definition: card.definition, set_id: card.set_id },
                    priority: 1
                  };
                  mlpq[cardId] = newCard;
                }
              } else {
                // if incorrect, simply bump it back up to highest priority (0)
                if (mlpq.hasOwnProperty(cardId)) {
                  console.log(mlpq[cardId]);
                  mlpq[cardId].priority = 0;
                } else {
                  const newCard = {
                    info: { term: card.term, definition: card.definition, set_id: card.set_id },
                    priority: 0
                  };
                  mlpq[cardId] = newCard;
                  console.log(mlpq[cardId]);
                }
              }
            });
          });
          // convert mlpq to array
          let mlpqArr = [];
          for (const termId in mlpq) {
            mlpqArr.push(mlpq[termId]);
          }
          mlpqArr.sort((card1, card2) => {
            return card1.priority - card2.priority;
          });
          console.log(mlpqArr);
          fetchedCards = mlpqArr.map((card) => card.info);
        }
        // if user has studied less than 10 cards, fetch more
        if (fetchedCards.length < dqLength) {
          // DEFAULT DAILY QUIZ algo: just fetch random cards
          User.findOne({ username: req.headers.username })
            .populate('sets')
            .then((u) => {
              let all_flashcards = [];
              u.sets.forEach((set) => {
                set.flashcards.forEach((flashcard) => {
                  all_flashcards.push({
                    term: flashcard.term,
                    definition: flashcard.definition,
                    set_id: set._id
                  });
                });
              });
              //NOTE: Cut our flashcards down to 10 for the daily quiz. We could try and customize this later.
              if (all_flashcards.length > dqLength - fetchedCards.length) {
                all_flashcards = _.sample(all_flashcards, dqLength - fetchedCards.length);
              }
              //RANDOMIZE the order of our daily quiz flashcards.
              //If someone wants to implement an algorithm, feel free to do so here.
              fetchedCards = fetchedCards.concat(all_flashcards);
              // fetchedCards = _.shuffle(fetchedCards);
            });
        }
        res.json(fetchedCards).status(200);
      }
    );
  } catch (err) {
    console.log('error when fetching user sets' + err);
    res.status(500).send({ message: 'error' });
  }
});

// Creating a POST request for daily quiz
router.post('/study-stats', async (req, res) => {
  // validation: check if body is empty
  if (Object.keys(req.body).length === 0) {
    console.log('Req body is empty');
    res.status(400).send({ message: 'Content cannot be empty' });
    return;
  }
  let correct = req.body.correct;
  let incorrect = req.body.incorrect;
  let doubleCoins = 1;
  console.log('correct terms:', correct);
  console.log('incorrect terms:', incorrect);
  const username = req.headers.username;
  let answers = [];
  correct.map((o) => {
    answers.push({
      term: o.term,
      set_id: o.set_id,
      definition: o.definition,
      correctness: true
    });
  });
  incorrect.map((o) => {
    answers.push({
      term: o.term,
      set_id: o.set_id,
      definition: o.definition,
      correctness: false
    });
  });

  let todays_stats = new DailyQuizHistory({
    username: username,
    dayOfQuiz: new Date(),
    percentageCorrect: correct.length / (correct.length + incorrect.length),
    answers: answers
  });

  try {
    todays_stats.save().then((savedHistory) => {
      User.findOne({ username: req.headers.username }).then((u) => {
        let combinedHistory = [...u.dailyquizHistory, savedHistory._id];
        let c = u.coins;
        User.findOneAndUpdate(
          { username },
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
    });
  } catch (err) {
    console.log('error when saving new set' + err);
    res.status(500).send({ message: 'error' });
  }

  User.findOne({ username: req.headers.username }).then((u) => {
    let combinedHistory = [...u.dailyquizHistory, todays_stats];
    let c = u.coins;
    console.log(doubleCoins);
    User.findOneAndUpdate(
      { username },
      {
        username,
        dailyquizHistory: combinedHistory,
        coins: c + correct.length * doubleCoins, //this coins algorithm is good for final product
        streak: u.streak + 1
      }, //UPDATE streak mechanism before end of sprint 4
      { new: true }
    ).then((u) => {
      const data = {
        status: 'Amazing success!',
        message: 'Congratulations on sending us this data!',
        your_data: req.body
      };
      res.status(200).json(data);
      console.log('Quiz finished!');
    });
  });
});

module.exports = router;
