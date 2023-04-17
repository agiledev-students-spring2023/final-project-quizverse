const express = require('express');
const axios = require('axios');
const FlashcardSet = require('../schemas/flashcard-set-schema');
const User = require('../schemas/user-schema');

const router = express.Router();

router.post('/edit-set/:id', (req, res) => {
  const id = req.params.id;
  // a mongoDB update takes place here
  const { title, description, cards } = req.body.info;
  // const user_id = req.body.user;
  const currentDate = new Date();

  try {
    FlashcardSet.updateOne({ _id: id }, { $set: { editedAt: currentDate, flashcards: cards } });
    res.status(200).send({ message: 'success' });
  } catch (err) {
    console.log('Erro occured: ', err);
    res.status(500).send(err);
  }
});

module.exports = router;
