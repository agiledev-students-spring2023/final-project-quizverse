// Router for the page that includes all flashcard sets and a search bar
const express = require('express');
const axios = require('axios');
const FlashcardSet = require('../schemas/flashcard-set-schema');
const router = express.Router();

router.get('/search/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  axios
    .get(`https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0`)
    .then((apiResponse) => {
      const data = apiResponse.data;
      const filteredData = data.filter((item) => {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      res.json(filteredData);
    })
    .catch((err) => {
      const backupData = [
        {
          numCards: 71,
          title: 'Progressive fault-tolerant portal',
          description:
            'Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum.'
        },
        {
          numCards: 3,
          title: 'Business-focused content-based Graphical User Interface',
          description:
            'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.'
        },
        {
          numCards: 17,
          title: 'Crash course on Agile development',
          description:
            'Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.'
        }
      ];
      const filteredBackupData = backupData.filter((item) => {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      res.json(filteredBackupData);
    });
});

router.get('/flashcard-sets', (req, res) => {
  FlashcardSet.find({})
    .then((setsFromMongo) => {
      const flashcardSets = [];
      setsFromMongo.map((set) => {
        flashcardSets.push({
          numCards: set.flashcards.length,
          title: set.title,
          description: set.description
        });
      });
      res.json(flashcardSets);
    })
    .catch((err) => {
      console.error(err);
    });
});


router.get('/flashcard-set/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: 'missing set id' });
  }

  axios
    .get(`https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0`)
    .then((apiResponse) => {
      const data = apiResponse.data;

      const backupData = {
        id,
        title: 'Agile Quiz',
        description:
          'This set is a mock quiz set that will be used to test dynamic study set editting. The id of the set will be the id passed in via the query params',
        cards: [
          { term: 'card1', definition: 'card1 def' },
          { term: 'card2', definition: 'card2 def' },
          { term: 'card3', definition: 'card3 def' }
        ]
      };
      res.status(200).json(backupData);
    })
    .catch((err) => {
      const backupData = {
        id,
        title: 'Agile Quiz',
        description:
          'This set is a mock quiz set that will be used to test dynamic study set editting. The id of the set will be the id passed in via the query params',
        cards: [
          { term: 'card1', definition: 'card1 def' },
          { term: 'card2', definition: 'card2 def' },
          { term: 'card3', definition: 'card3 def' }
        ]
      };
      res.json(backupData)
      res.status(500).send({ message: 'api request error' });
    });
});
router.get('/flashcards', (req, res) => {
  axios
    .get(`https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0`)
    .then((apiResponse) => {
      const data = apiResponse.data;
      const filteredData = data.filter((item) => {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      res.json(filteredData);
    })
    .catch((err) => res.status(500).send({ message: 'api request error' }));
});
module.exports = router;
