const express = require('express');
const axios = require('axios');
const { FlashcardSet, Flashcard } = require('../schemas/flashcard-set-schema');
const User = require('../schemas/user-schema');
const { check, validationResult } = require('express-validator');
const jwt_auth = require('./jwt');

const router = express.Router();

router.get('/delete-set/:id', jwt_auth, async (req, res, next) => {
  const id = req.params.id;
  username = req.headers.username;
  try{
    console.log(id)
    FlashcardSet.findOneAndDelete({ createdBy: username, _id: id }).then((s)=>{
      console.log(s)
    })
    
    res.status(200).send({message: 'success'})
  }
  catch (err){
    console.log(err);
    res.status(404).send({ message: 'error' });
  }
})

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
      }).then((f)=>{
        // console.log(f)
      });
      res.status(200).send({ message: 'success' });
    } catch (err) {
      console.log('Error occured: ', err);
      res.status(500).send(err);
    }
  }
);

module.exports = router;
