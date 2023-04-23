const express = require('express');
const axios = require('axios');
const {FlashcardSet, Flashcard} = require('../schemas/flashcard-set-schema');
const User = require('../schemas/user-schema');

const router = express.Router();
router.post('/create-set', async (req, res) => {
  const { title, description, cards } = req.body.info;
  const username = req.headers.username;
  // const user_id = req.body.user;
  const newSet = new FlashcardSet({
    title: title,
    description: description,
    createdBy: req.headers.username,
    flashcards: cards.map((card) => {
      return new Flashcard({
        term: card.term,
        definition: card.definition
      });
    }),
    createdAt: new Date(),
    editedAt: new Date()
  });
  console.log(newSet); //debugging purposes
  newSet.save().then((err, set) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'error' });
    } else {
      try {
        User.updateOne({ username }, { $push: { flashcards: set._id } });
        res.status(200).send({ message: 'success' });
      } catch (err) {
        console.log('error when updating user set list' + err);
        res.status(500).send({ message: 'error' });
      }
    }
  });
});

module.exports = router;
