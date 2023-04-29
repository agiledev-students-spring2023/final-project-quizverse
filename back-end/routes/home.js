//Routing for all of Daily Quiz Things
const express = require('express');
const axios = require('axios');
const router = express.Router();
const User = require('../schemas/user-schema')
const jwt_auth = require('./jwt');


router.get('/home', jwt_auth, async (req, res, next) => {
  // use axios to make a request to an API for flashcard data in the daily quiz
  const data = {};
  User.findOne({ username: req.headers.username })
    .then(
      (u) => {
        // if (!u.username ==null&& !u.streak==null && !u.coins==null){
        const data = {
          username: u.username,
          streak: u.streak,
          coins: u.coins
        };
        res.json(data);
      }
      // else{
      //   res.status(401).send("Invalid User");
      // }
    )
    .catch(/* res.status(405).send('Invalid Username')*/); //James said this somehow always activates?
  //code section 1
});
module.exports = router;
