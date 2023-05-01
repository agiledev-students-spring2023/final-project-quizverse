// Router for the page that includes all flashcard sets and a search bar
const express = require('express');
const axios = require('axios');
const { FlashcardSet } = require('../schemas/flashcard-set-schema');
const router = express.Router();
const jwt_auth = require('./jwt');
const User = require('../schemas/user-schema');
const mongoose = require('mongoose');

//code section 4
router.get('/flashcard-sets', jwt_auth, (req, res) => {
  username = req.headers.username;
  try {
    FlashcardSet.find({ createdBy: username }).then((sets) => {
      if (!sets) {
        res.status(204).send('user has no sets created'); // if no sets returned, signify no content
      } else {
        console.log(sets.length);
        res.status(200).send(sets);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: 'error' });
  }
  //code section 3
});

router.get('/flashcard-set/:username/:id', (req, res) => {
  const id = req.params.id;
  username = req.params.username;
  if (!id) {
    res.status(400).send({ message: 'missing set id' });
  } else if (!username) {
    res.status(400).send({ message: 'missing username' });
  } else {
    try {
      FlashcardSet.findOne({createdBy: username, _id: id}).then((set) => {
        // console.log(set);
        res.status(200).send(set);
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'searching error' });
    }
    //code section 2
  }
  //code section 1
});
module.exports = router;
