// Router for the page that includes all flashcard sets and a search bar
const express = require('express');
const axios = require('axios');
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
    .catch((err) => next(err));
});

router.get('/flashcard-sets', (req, res) => {
  axios
    .get(`https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0`)
    .then((apiResponse) => {
      const data = apiResponse.data;
      res.json(data);
    })
    .catch((err) => res.status(500).send({ message: 'api request error' }));
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
      console.log(err);
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
