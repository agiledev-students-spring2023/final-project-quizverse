// router responsible for the footer
const express = require('express');
const axios = require('axios');
const User = require('../schemas/user-schema');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
//body().isEmpty().withMessage('Body of request is empty')
router.post('/shop', (req, res) => {
  //code section 1
  const username = req.headers.username;
  const item_id = req.headers.item;
  //const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ errors: errors.array() });
  // }
  User.findOne({ username: username }).then((u) => {
    if ('items' in u && u.items.includes(item_id)) {
      res.status(201).send({ message: 'Already owned' });
    } else {
      let coins = u.coins;
      let coins_deducted = 0;
      if (item_id == 1) {
        coins_deducted = 50;
      }
      if (item_id == 2) {
        coins_deducted = 100;
      }
      if (item_id == 3) {
        coins_deducted = 150;
      }
      if (coins < coins_deducted) {
        res.status(202).send({ message: 'not enough coins' });
      } else {
        let newItems = [];
        if ('items' in u) {
          newItems = [...u.items, item_id];
        } else {
          newItems = [item_id];
        }

        User.findOneAndUpdate(
          { username: req.headers.username },
          { items: newItems, coins: coins - coins_deducted },
          { new: true }
        ).then((u) => {
          console.log(u);
          res.status(200).send({ message: 'success' });
        });
      }
    }
  });
});

module.exports = router;
