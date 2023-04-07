//Routing for all of Daily Quiz Things
const express = require('express');
const axios = require('axios');
const router = express.Router();


router.get('/daily-quiz', (req, res, next) => {
  // use axios to make a request to an API for flashcard data in the daily quiz
  user = req.params.user;
  //Do something with a database lookup with user. For now, this is still just calling Mockaroo.
  axios
    .get('https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0')
    .then((apiResponse) => res.json(apiResponse.data)) // pass data along directly to client
    .catch((err) => next(err)); // pass any errors to express
});

// Creating a POST request for daily quiz
/* istanbul ignore next */
router.post('/study-stats', (req, res) => {
  axios
    .post('https://my.api.mockaroo.com/generic_post.json?key=6b3bc3e0&__method=POST', req.body)
    .then(console.log('Succesfully sent to database'))
    .catch((err) => next(err));
  const data = {
    status: 'Amazing success!',
    message: 'Congratulations on sending us this data!',
    your_data: req.body
  };
  // ... then send a response of some kind to client
  res.json(data);
});


module.exports = router;
