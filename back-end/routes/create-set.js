const express = require('express');
const { FlashcardSet, Flashcard } = require('../schemas/flashcard-set-schema');
const User = require('../schemas/user-schema');
const { check, validationResult } = require('express-validator');
const DailyQuizHistory = require('../schemas/dailyquizHistory-schema');

const router = express.Router();
router.post(
  '/create-set',
  [check('info.title').notEmpty().withMessage('Set title cannot be empty')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { title, description, cards } = req.body.info;
    const username = req.headers.username;
    const newSet = new FlashcardSet({
      title: title,
      description: description,
      createdBy: req.headers.username,
      flashcards: cards.map((card) => {
        return new Flashcard({
          term: card.term.trim(),
          definition: card.definition.trim()
        });
      }),
      createdAt: new Date(),
      editedAt: new Date()
    });
    console.log(newSet); //debugging purposes
    try {
      newSet.save().then((savedSet) => {
        // initialize a dailyquiz history of all false to promote new cards to be studied in daily quiz
        let answers = cards.map((card) => {
          return {
            term: card.term,
            definition: card.definition,
            correctness: false,
            set_id: newSet
          };
        });
        const newHistory = new DailyQuizHistory({
          username,
          dayOfQuiz: new Date(),
          percentageCorrect: 0, // will have to set to 0 for now
          answers
        });
        newHistory.save();
      });
    } catch (err) {
      console.log('error when saving new set' + err);
      res.status(500).send({ message: 'error' });
    }

    console.log('arrived');
    try {
      User.findOne({ username: req.headers.username }).then((u) => {
        existingSets = u.sets;
        existingSetsPlusNew = [...existingSets, newSet];
        User.findOneAndUpdate(
          { username: req.headers.username },
          { sets: existingSetsPlusNew },
          { new: true }
        ).then((u) => {
          console.log('updated user', u);
        });
        res.status(200).send({ message: 'success' });
      });
    } catch (err) {}
  }
);

module.exports = router;
