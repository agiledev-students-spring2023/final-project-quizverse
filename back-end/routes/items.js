//Routing for all of Items Page Things
const express = require('express');
const axios = require('axios');
const router = express.Router();
const jwt_auth = require('./jwt');
const User = require('../schemas/user-schema');

const item_id_table = {
  1: {item: "Coins x2", desc: "Double your coins when studying."},
  2: {item: "Time Travel Ticket", desc: "Go back in time to redo a daily study session."},
  3: {item: "Streak Freeze", desc: "Protect your streak for 1 day in the future."}
}

router.get('/your-items', jwt_auth, (req, res, next) => {
  // use axios to make a request to an API for flashcard data in the daily quiz
  user = req.headers.username;
  //code section 1

  User.findOne({ username: req.headers.username }).then((u) => {
    const items = u.items;
    console.log(`items:${items}`);
    if (!items) {
      res.send({ message: 'Empty' });
    } else {
      const data = items.map((i) => {
      console.log(item_id_table[i]);
      return item_id_table[i];
      });
      res.json({ message: 'Success', items: data });
    }
  });
});
router.post('/use-items', jwt_auth, (req, res, next) => {
  item_id = req.headers.item_id;
  user = req.headers.username;
  let filter = { username: user, 'inventory.item_id': 1 };
  let update = { $inc: { 'inventory.$.number_owned': -1 }, 'inventory.$.in_use': true };
  User.findOneAndUpdate(filter, update, {
    new: true
  })
    .then(() => console.log('Success?'))
    .catch((err) => {
      console.log(`Failure: ${err}`);
    });
  res.status(200).send({ message: 'success' });
});

module.exports = router;
