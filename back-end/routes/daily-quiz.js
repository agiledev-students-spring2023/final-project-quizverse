//Routing for all of Daily Quiz Things
const express = require('express');
const axios = require('axios');
const router = express.Router();
const jwt_auth = require('./jwt');

router.get('/daily-quiz', jwt_auth, (req, res, next) => {
  // use axios to make a request to an API for flashcard data in the daily quiz
  user = req.query.user;
  //Do something with a database lookup with user. For now, this is still just calling Mockaroo.
  axios
    .get('https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0')
    .then((apiResponse) => res.json(apiResponse.data)) // pass data along directly to client
    .catch((err) => {
      // the server returned an error... probably too many requests... until we pay!

      // make some backup fake data
      const backupData = [
        {
          term: 'encryption',
          definition:
            'adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit'
        },
        {
          term: 'instruction set',
          definition:
            'convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam'
        },
        {
          term: 'contingency',
          definition:
            'elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue'
        },
        {
          term: 'Sharable',
          definition:
            'vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa'
        },
        {
          term: 'User-friendly',
          definition:
            'praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus'
        },
        {
          term: 'executive',
          definition: 'sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl'
        },
        {
          term: 'model',
          definition: 'elit proin interdum mauris non ligula pellentesque ultrices phasellus id'
        },
        {
          term: 'Ergonomic',
          definition:
            'massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi'
        },
        {
          term: 'intangible',
          definition:
            'porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis'
        },
        {
          term: 'challenge',
          definition: 'luctus rutrum nulla tellus in sagittis dui vel nisl duis ac'
        }
      ];
      res.json(backupData);
    });
});
// Creating a POST request for daily quiz
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
