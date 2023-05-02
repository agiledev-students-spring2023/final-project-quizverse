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

  User.findOne({ username: username }).then((u) => {
      let coins = u.coins;
      let coins_deducted = 0;
      if (item_id == 1) {
        coins_deducted = 50;
      }
      if (item_id == 2) {
        coins_deducted = 150;
      }
      if (coins < coins_deducted) {
        res.status(202).send({ message: 'not enough coins' });
      } else {
        let newInv = u.inventory;
        if (item_id == 1){
          newInv[0].number_owned += 1
        }
        if (item_id == 2){
          newInv[1].number_owned += 1
        }
        console.log(newInv)
        User.findOneAndUpdate(
          { username: req.headers.username },
          { inventory: newInv, coins: coins - coins_deducted },
          { new: true }
        ).then((u) => {
          console.log(u);
          res.status(200).send({ message: 'success' });
        });
      }
  });
});

module.exports = router;
