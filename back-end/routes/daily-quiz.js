//Routing for all of Daily Quiz Things
const express = require('express');
const axios = require('axios');
const router = express.Router();
const jwt_auth = require('./jwt');
const { FlashcardSet, Flashcard } = require('../schemas/flashcard-set-schema');
const User = require('../schemas/user-schema');
const DailyQuizHistory = require('../schemas/dailyquizHistory-schema');
const { check, validationResult, body } = require('express-validator');

const History = require('../schemas/history-schema');
const _ = require('underscore');

const mapCorrect = (correct) => {
  let res = []
  correct.map((o) => {
    res.push({ term: o.term,
      set_id: o.set_id,
      definition: o.definition,
      correctness: true
    });
  });
  return res
}

const mapIncorrect = (incorrect) => {
  let res = []
  incorrect.map((o) => {
    res.push({
      term: o.term,
      set_id: o.set_id,
      definition: o.definition,
      correctness: false
    });
  });
  return res
}

const checkHistories = (histories) => {
  let mlpq = {};
  histories.forEach((history) => {
    history.answers.forEach((card) => {
      // identify each card by its term and def to distinguish same term with multiple defs
      const cardId = card.term + card.definition;
      // if correct, increase its score to indicate a lower priority
      if (card.correctness) {
        if (mlpq.hasOwnProperty(cardId)) {
          mlpq[cardId].priority = mlpq[cardId].priority + 1;
        } else {
          //console.log(card);
          const newCard = {
            info: { term: card.term, definition: card.definition, set_id: card.set_id },
            priority: 1
          };
          mlpq[cardId] = newCard;
        }
      } else {
        // if incorrect, simply bump it back up to highest priority (0)
        if (mlpq.hasOwnProperty(cardId)) {
          //console.log(mlpq[cardId]);
          mlpq[cardId].priority = 0;
        } else {
          const newCard = {
            info: { term: card.term, definition: card.definition, set_id: card.set_id },
            priority: 0
          };
          mlpq[cardId] = newCard;
          //console.log(mlpq[cardId]);
        }
      }
    });
  });
  return mlpq;
}

const convertMLPQToArray = (mlpq) => {
  let mlpqArr = [];
        for (const termId in mlpq) {
          mlpqArr.push(mlpq[termId]);
        }
        mlpqArr.sort((card1, card2) => {
          return card1.priority - card2.priority;
        });
        //console.log(mlpqArr);
        return mlpqArr.map((card) => card.info);
}

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

    const validationUser = await User.findOne({ username: req.headers.username });
    if (validationUser.sets.length === 0) {
      return res.status(400).json({ msg: 'User has no sets' });
    }

    // first find all of the user's history, then sort by their lastest to most recent quiz
    DailyQuizHistory.aggregate([{ $match: { username } }, { $sort: { dayOfQuiz: 1 } }]).then(
      (histories) => {
        // if the user has a history, proceed to populate mlpq
        if (histories.length >= 1) {
          mlpq = checkHistories(histories);
          fetchedCards = convertMLPQToArray(mlpq);
        }
        // COMMENTING OUT FOR BUG FIX
        // if (fetchedCards.length < dqLength) {
        //   User.findOne({ username: req.headers.username })
        //     .populate('sets')
        //     .then((u) => {
        //       let all_flashcards = [];
        //       u.sets.forEach((set) => {
        //         set.flashcards.forEach((flashcard) => {
        //           all_flashcards.push({
        //             term: flashcard.term,
        //             definition: flashcard.definition,
        //             set_id: set._id
        //           });
        //         });
        //       });
        //       //NOTE: Cut our flashcards down to 10 for the daily quiz. We could try and customize this later.
        //       if (all_flashcards.length > dqLength - fetchedCards.length) {
        //         all_flashcards = _.sample(all_flashcards, dqLength - fetchedCards.length);
        //       }
        //       //RANDOMIZE the order of our daily quiz flashcards.
        //       fetchedCards = fetchedCards.concat(all_flashcards);
        //     });
        // }
        res.json(fetchedCards.slice(0, 10)).status(200);
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
  let streakFreeze = false;
  let streakFreezeUsed = false;
  const username = req.headers.username;
  let answers = [];
  answers.push.apply(answers, mapCorrect(correct))
  answers.push.apply(answers, mapIncorrect(incorrect))

  let todays_stats = new DailyQuizHistory({
    username: username,
    dayOfQuiz: new Date(),
    percentageCorrect: correct.length / (correct.length + incorrect.length),
    answers: answers
  });

  try {
    todays_stats.save().then(async (savedHistory) => {
      // let doubleCoinsUser = await User.exists({
      //   username: username,
      //   'inventory.item_id': 1,
      //   'inventory.in_use': true
      // }); this is User.exists code that I'm saving for reference
      let itemUser = await User.findOne({
        username: username
      });
      if (itemUser) {
        if (itemUser.inventory[0].in_use) {
          console.log('DOUBLE COINS!!!');
          doubleCoins = 2;
        }
        if (itemUser.inventory[1].in_use) {
          console.log('Streak freeze activated and has been used!');
          streakFreeze = true;
        }
      }
      User.findOne({ username: username }).then(async (u) => {
        let combinedHistory = [...u.dailyquizHistory, todays_stats];
        let c = u.coins;
        // find most recent dailyQuiz
        const lastQuiz = await DailyQuizHistory.aggregate([
          { $match: { username } },
          { $sort: { dayOfQuiz: -1 } },
          { $limit: 2 }
        ]);
        let { streak } = await User.findOne({ username });
        console.log('current streak is: ', streak);
        const dateOfLastQuiz = new Date(lastQuiz[1].dayOfQuiz);
        console.log(dateOfLastQuiz);
        console.log(new Date());
        const DAY = 1000 * 60 * 60 * 24; // 24 hours
        //const DAY = 0; //testing streak freeze
        const yesterday = Date.now();
        console.log(yesterday - dateOfLastQuiz);
        console.log('within 24 hrs: ', yesterday - dateOfLastQuiz < DAY);
        if (yesterday - dateOfLastQuiz < DAY) {
          streak += 1;
        } else if (streakFreeze) {
          streak += 1;
          streakFreezeUsed = true;
        } else {
          streak = 0;
        }
        console.log(doubleCoins);
        if (streakFreezeUsed) {
          await User.findOneAndUpdate(
            { username: username, 'inventory.item_id': 2 },
            { 'inventory.$.in_use': false },
            { upsert: true }
          ).then(() => console.log('Streak freeze no longer enabled!'));
        }
        User.findOneAndUpdate(
          { username },
          {
            username,
            dailyquizHistory: combinedHistory,
            coins: c + correct.length * doubleCoins,
            streak
          },
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
  } catch (err) {
    console.log('error when saving new set' + err);
    res.status(500).send({ message: 'error' });
  }
 
});

module.exports = {
  dailyQuizRouter: router,
  convertMLPQToArray,
  checkHistories,
  mapCorrect,
  mapIncorrect
}