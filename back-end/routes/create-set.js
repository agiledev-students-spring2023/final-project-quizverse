const express = require('express');
const axios = require('axios');
const flashcardSetSchema = require('../schemas/flashcard-set-schema');

const router = express.Router();
router.post('/create-set', (req, res) => {
  const data = req.body.upload;
  const { title, description, cards } = req.body.info;

  const flashcardSet = new flashcardSetSchema({
    title,
    description,
    createdBy: 'John',
    flashcards: cards
  });

  flashcardSet.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'error' });
    }
  });

  res.status(200).send({ message: 'success' });
});

module.exports = router;
