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
        .catch((err) => next(err));
});

module.exports = router;
