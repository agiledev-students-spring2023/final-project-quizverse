const express = require('express');
const axios = require('axios');
const { FlashcardSet, Flashcard } = require('../schemas/flashcard-set-schema');
const User = require('../schemas/user-schema');

const router = express.Router();

router.post('/edit-set/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  // a mongoDB update takes place here
  const { title, description, cards } = req.body.info;
  const flashcardObjs = cards.map((card) => {
    return new Flashcard({
      term: card.term,
      definition: card.definition
    });
  });
  console.log(flashcardObjs);
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
    }).then((newSet) => {
      console.log(newSet);
    });
    res.status(200).send({ message: 'success' });
  } catch (err) {
    console.log('Erro occured: ', err);
    res.status(500).send(err);
  }
});

module.exports = router;
