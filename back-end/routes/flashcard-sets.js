// Router for the page that includes all flashcard sets and a search bar
const express = require('express');
const axios = require('axios');
const router = express.Router();

// The search term should be dynamic, so no matter what the search term is,
// it should be able to go through this route and return the correct data.
// This is the route that will be used to search for flashcards.
router.get('/search/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  // Ideally, this will be replaced later with flashcard sets (via the backend), as opposed to just
  // the flashcards themselves.
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

// This route will handle the actualy flashcard sets. So here, we want to
// get all of the flashcard sets from the backend, and then send them to the
// front end. These will be unfiltered for now (i.e. no search should have had been
// made yet).
router.get('/flashcard-sets', (req, res) => {
  // This is still just calling Mockaroo, but ideally, this will be replaced
  // with a call to the backend to get all of the flashcard sets.
  axios
    .get(`https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0`)
    .then((apiResponse) => {
      const data = apiResponse.data;
      res.json(data);
    })
    .catch((err) => res.status(500).send({ message: 'api request error' }));
});

router.get('/flashcard-set/:id', (req, res) => {
  // Ideally, this will be replaced later with flashcard sets (via the backend), as opposed to just
  // the flashcards themselves.
  //This is each individual flashcard set (FullFlashCardSet)

  // enforce a set id to be included, otherwise send error message indicating that no id was included in get params
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: 'missing set id' });
  }

  axios
    .get(`https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0`)
    .then((apiResponse) => {
      const data = apiResponse.data;

      // utilize backup data for testing since mockaroo may crash
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
  // Ideally, this will be replaced later with flashcard sets (via the backend), as opposed to just
  // the flashcards themselves.
  //This should be the view of all the flashcards
  axios
    .get(`https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0`)
    .then((apiResponse) => {
      const data = apiResponse.data;
      const filteredData = data.filter((item) => {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      res.json(filteredData);
      /*
      This data would be something like this:
          {
            numCards: 80,
            title: 'Realigned background approach',
            description:
              'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.'
          },
          {
            numCards: 92,
            title: 'Robust responsive success',
            description: 'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.'
          }
      */
    })
    .catch((err) => res.status(500).send({ message: 'api request error' }));
});
module.exports = router;
