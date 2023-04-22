const express = require('express');
const axios = require('axios');
const {FlashcardSet, Flashcard} = require('../schemas/flashcard-set-schema');
const User = require('../schemas/user-schema');

const router = express.Router();
router.post('/create-set', (req, res) => {
  const { title, description, cards } = req.body.info;
  // const user_id = req.body.user;
  const newFlashcard = new Flashcard({
    term: "term",
    definition: "definition"
  })
  const newSet = new FlashcardSet({
    title: "title2",
    description: "descr2",
    createdBy: 'John',
    flashcards: newFlashcard,
    createdAt: new Date(),
    editedAt: new Date()
  });

  // console.log(newSet);

  newSet.save().then((err, set) => {
    if (!err===null) {
      console.log(err);
      res.status(500).send({ message: 'error' });
    } else {
      res.status(200).send({ message: 'success' });
    }
    // add the new set to the list of sets the user created
    // User.updateOne({ _id: user_id }, { $push: { sets: set._id } });
  });
});

module.exports = router;
