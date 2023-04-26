const express = require('express');
const axios = require('axios');
const { FlashcardSet, Flashcard } = require('../schemas/flashcard-set-schema');
const User = require('../schemas/user-schema');
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.post(
  '/edit-set/:id',
  [check('info.title').notEmpty().withMessage('Set title cannot be empty')],
  (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // a mongoDB update takes place here
    const { title, description, cards } = req.body.info;
    const flashcardObjs = cards.map((card) => {
      return new Flashcard({
        term: card.term,
        definition: card.definition
      });
    });
    const username = req.headers.username;
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
      });
      res.status(200).send({ message: 'success' });
    } catch (err) {
      console.log('Error occured: ', err);
      res.status(500).send(err);
    }
  }
);

module.exports = router;
