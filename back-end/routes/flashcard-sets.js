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

module.exports = router;
