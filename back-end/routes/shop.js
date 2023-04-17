// router responsible for the footer
const express = require('express');
const axios = require('axios');
const User = require('../schemas/user-schema');
const router = express.Router();

router.post('/shop', (req, res) => {
  // axios
  //   .post('https://my.api.mockaroo.com/generic_post.json?key=6b3bc3e0&__method=POST')
  //   .then(console.log('Succesfully sent item purchase to database.'))
  //   .catch((err) => next(err));
  // const data = {
  //   status: 'Amazing success!',
  //   message: 'Congratulations on buying this item!',
  //   your_data: {}
  // };
  try {
    const filter = { username: 'Anna' };
    const update = { items: { item_id: 1, number_owned: 1 } };
    // //prettier-ignore
    // const update = { items: { item_id: 1, $inc: { 'number_owned': 1 } } };
    const user = User.findOneAndUpdate(filter, update, {
      new: true
    })
      .then((user) => {
        console.log(`saved ${user}`); //printing the user object
      })
      .catch((err) => {
        console.log(`Failure: ${err}`);
      });
  } catch (e) {
    console.log(e.message);
  }
  // ... then send a response of some kind to client
  res.json({ item: 'monkey' });
});

module.exports = router;
