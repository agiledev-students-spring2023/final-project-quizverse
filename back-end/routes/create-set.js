const express = require('express');
const axios = require('axios');
const {FlashcardSet, Flashcard} = require('../schemas/flashcard-set-schema');
const User = require('../schemas/user-schema');
const { check, validationResult } = require('express-validator');

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
    // const user_id = req.body.user;
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
      newSet.save();
    } catch (err) {
      console.log('error when saving new set' + err);
      res.status(500).send({ message: 'error' });
    }

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
