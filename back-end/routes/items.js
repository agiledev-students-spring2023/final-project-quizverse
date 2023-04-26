//Routing for all of Items Page Things
const express = require('express');
const axios = require('axios');
const router = express.Router();
const jwt_auth = require('./jwt');
const User = require('../schemas/user-schema');

const item_id_table = {
  1: { item: 'Coins x2', desc: 'Double your coins when studying.', item_id: 0 },
  2: {
    item: 'Time Travel Ticket',
    desc: 'Go back in time to redo a daily study session.',
    item_id: 1
  },
  3: { item: 'Streak Freeze', desc: 'Protect your streak for 1 day in the future.', item_id: 2 }
};

router.get('/your-items', jwt_auth, (req, res, next) => {
  // use axios to make a request to an API for flashcard data in the daily quiz
  user = req.headers.username;

  User.findOne({ username: req.headers.username }).then((u) => {
    const items = u.items;
    console.log(`items:${items}`);
    data = items.map((i) => {
      console.log(item_id_table[i]);
      return item_id_table[i];
    });
    res.json(data);
  });
});


module.exports = router;
