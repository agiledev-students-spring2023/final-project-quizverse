// router responsible for the footer
const express = require('express');

const router = express.Router();

router.post('/shop', (req, res) => {
  axios
    .post('https://my.api.mockaroo.com/generic_post.json?key=6b3bc3e0&__method=POST')
    .then(console.log('Succesfully sent item purchase to database.'))
    .catch((err) => next(err));
  const data = {
    status: 'Amazing success!',
    message: 'Congratulations on buying this item!',
    your_data: {}
  };
  // ... then send a response of some kind to client
  res.json(data);
});

module.exports = router;
