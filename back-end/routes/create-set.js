const express = require('express');
const axios = require('axios');
const {FlashcardSet, Flashcard} = require('../schemas/flashcard-set-schema');
const User = require('../schemas/user-schema');

const router = express.Router();
router.post('/create-set', async (req, res) => {
  const { title, description, cards } = req.body.info;
  // const user_id = req.body.user;
  const newFlashcard = new Flashcard({
    term: "term",
    definition: "definition"
  })
  const newSet = new FlashcardSet({
    title: title,
    description: description,
    createdBy: req.headers.username,
    flashcards: cards.map((card) => {
      return new Flashcard({
        term:card.term,
        definition:card.definition
      })
    }),
    createdAt: new Date(),
    editedAt: new Date()
  });
  let existingSets = []
  let existingSetsPlusNew = []
  User.findOne({username:req.headers.username}).then((u)=>{
    existingSets = u.sets
    existingSetsPlusNew = [...existingSets, newSet]
    User.findOneAndUpdate({ username: req.headers.username }, 
      {sets: existingSetsPlusNew
      }, 
      {new:true }).
      then((u)=>{
      console.log(u)
    });
  })

  res.status(200).send({message: 'success'});
  //console.log(newSet); //debugging purposes

  // newSet.save().then((err, set) => {
  //   if (!err===null) {
  //     console.log(err);
  //     res.status(500).send({ message: 'error' });
  //   } else {
  //     res.status(200).send({ message: 'success' });
  //   }
  //   // add the new set to the list of sets the user created
  // });
});


module.exports = router;
