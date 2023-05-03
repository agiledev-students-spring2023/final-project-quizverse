const express = require('express');
const axios = require('axios');
const { FlashcardSet, Flashcard } = require('../schemas/flashcard-set-schema');
const User = require('../schemas/user-schema');
const DailyQuizHistory = require('../schemas/dailyquizHistory-schema');
const { check, validationResult } = require('express-validator');
const jwt_auth = require('./jwt');

const router = express.Router();

router.get('/delete-set/:id', jwt_auth, async (req, res, next) => {
  const id = req.params.id;
  username = req.headers.username;
  try {
    console.log(id);
    FlashcardSet.findOneAndDelete({ createdBy: username, _id: id }).then((s) => {
      //console.log(s)
    });
    User.findOne({ username: username }).then((u) => {
      let sets = u.sets;
      let newSets = [];
      sets.forEach((item, index, arr) => {
        if (id != item) {
          newSets.push(item);
        }
      });
      User.findOneAndUpdate({ username: username }, { sets: newSets }).then((u) => {});
    });
    res.status(200).send({ message: 'success' });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: 'error' });
  }
});

router.post(
  '/edit-set/:id',
  [check('info.title').notEmpty().withMessage('Set title cannot be empty')],
  (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { title, description, cards } = req.body.info;
    const flashcardObjs = cards.map((card) => {
      return new Flashcard({
        term: card.term.trim(),
        definition: card.definition.trim()
      });
    });
    const currentDate = new Date();
    const update = {
      title,
      description,
      editedAt: currentDate,
      flashcards: flashcardObjs
    };
    try {
      FlashcardSet.findOneAndUpdate({ _id: id }, update, {
        new: true
      }).then((f) => {
        let answers = cards.map((card) => {
          return {
            term: card.term.trim(),
            definition: card.definition.trim(),
            correctness: true,
            set_id: id
          };
        });
        const newHistory = new DailyQuizHistory({
          username,
          dayOfQuiz: new Date(),
          percentageCorrect: 1,
          answers
        });
        newHistory.save();
      });
      res.status(200).send({ message: 'success' });
    } catch (err) {
      console.log('Error occured: ', err);
      res.status(500).send(err);
    }
  }
);

module.exports = router;
