// Router for the page that includes all flashcard sets and a search bar
const express = require('express');
const axios = require('axios');
const { FlashcardSet } = require('../schemas/flashcard-set-schema');
const router = express.Router();
const jwt_auth = require('./jwt');
const User = require('../schemas/user-schema');
const mongoose = require('mongoose');

/*
 * Commenting out for now because I'm not sure what this does, and it's not linked to DB.
 */

// router.get('/search/:searchTerm', jwt_auth, (req, res) => {
//   const searchTerm = req.params.searchTerm;
//   axios
//     .get(`https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0`)
//     .then((apiResponse) => {
//       const data = apiResponse.data;
//       const filteredData = data.filter((item) => {
//         return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//       });
//       res.json(filteredData);
//     })
//     .catch((err) => {
//       const backupData = [
//         {
//           numCards: 71,
//           title: 'Progressive fault-tolerant portal',
//           description:
//             'Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum.'
//         },
//         {
//           numCards: 3,
//           title: 'Business-focused content-based Graphical User Interface',
//           description:
//             'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.'
//         },
//         {
//           numCards: 17,
//           title: 'Crash course on Agile development',
//           description:
//             'Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.'
//         }
//       ];
//       const filteredBackupData = backupData.filter((item) => {
//         return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//       });
//       res.json(filteredBackupData);
//     });
// });

router.get('/flashcard-sets', jwt_auth, (req, res) => {
  username = req.headers.username;
  try {
    FlashcardSet.find({ createdBy: username }).then((sets) => {
      if (!sets) {
        // if no sets returned
        res.status(204).send('user has no sets created'); // signify no content
      } else {
        console.log(sets.length);
        res.status(200).send(sets);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: 'error' });
  }

  // User.findOne({username:username}).populate('sets').then((u)=>{
  //   sets = u.sets
  //   const flashcardSets = [];
  //     sets.map((set) => {
  //       flashcardSets.push({
  //         numCards: (set.flashcards?set.flashcards.length:0),
  //         title: set.title,
  //         description: set.description,
  //         createdBy: username,
  //         id: set._id
  //       });
  //     });
  //     res.status(200).json(flashcardSets);
  // })
  // FlashcardSet.findOne({})
  //   .then((setsFromMongo) => {
  //     const flashcardSets = [];
  //     setsFromMongo.map((set) => {
  //       flashcardSets.push({
  //         numCards: set.flashcards.length,
  //         title: set.title,
  //         description: set.description
  //       });
  //     });
  //     res.json(flashcardSets);
  //   })
});

router.get('/flashcard-set/:username/:id', (req, res) => {
  const id = req.params.id;
  username = req.params.username;
  if (!id) {
    res.status(400).send({ message: 'missing set id' });
  }
  else if (!username) {
    res.status(400).send({ message: 'missing username' });
  }
  else {
    try {
      FlashcardSet.findOne({createdBy: username, _id: id}).then(set => {
        console.log(set)
        res.status(200).send(set)
      })
    }
    catch (err) {
      console.log(err)
      res.status(400).send({message: 'searching error'})
    }

    // serach under sets instead of under user
    // User.findOne({username:username}).populate("sets").then((u)=>{
    //   sets = u.sets
    //   let response_set = {
    //     title: '',
    //     description: '',
    //     cards: []
    //   }
    //   for (set in sets){
    //     mongoose_id = new mongoose.Types.ObjectId(id)
    //     if (sets[set]._id==id){
    //       response_set = {
    //         title: sets[set].title,
    //         description: sets[set].description,
    //         cards: sets[set].flashcards
    //       }
    //       res.status(200).json(response_set)
    //     }
    //   }
    // })
  }
  
 
  // FlashcardSet.findOne({_id: mongoose_id}).then((set)=>{
  //   console.log(set)
  //   res.status(200).json(set)
  // })
  // .catch((err)=>{
  //   console.log(err)
  // })

  // FlashcardSet.findById(id)
  //   .then((setFromMongo) => {
  //     console.log(setFromMongo);
  //     res.json(setFromMongo);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
});

// outdated route that no longer does anything
// router.get('/flashcards', jwt_auth, (req, res) => {
//   axios
//     .get(`https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0`)
//     .then((apiResponse) => {
//       const data = apiResponse.data;
//       const filteredData = data.filter((item) => {
//         return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//       });
//       res.json(filteredData);
//     })
//     .catch((err) => res.status(500).send({ message: 'api request error' }));
// });
module.exports = router;
