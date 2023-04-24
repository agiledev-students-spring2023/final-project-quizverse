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
//   try {
//     const filter = { username: 'Anna' };
//     const update = { items: { item_id: 1, number_owned: 1 } };
//     // //prettier-ignore
//     // const update = { items: { item_id: 1, $inc: { 'number_owned': 1 } } };
//     const user = User.findOneAndUpdate(filter, update, {
//       new: true
//     })
//       .then((user) => {
//         console.log(`saved ${user}`); //printing the user object
//       })
//       .catch((err) => {
//         console.log(`Failure: ${err}`);
//       });
//   } catch (e) {
//     console.log(e.message);
//   }
//   // ... then send a response of some kind to client
//   res.status(200);
  const username = req.headers.username;
  const item_id = req.headers.item;
  User.findOne({ username: req.headers.username }).then((u) => {
    if('items' in u && u.items.includes(item_id)){
      res.status(201).send({ message: 'Already owned' });
    }
    else{
      let coins = u.coins
      let coins_deducted = 0
      if (item_id==1){
        coins_deducted = 50
      }
      if (item_id==2){
        coins_deducted = 100
      }
      if (item_id==3){
        coins_deducted = 150
      }
      if (coins<coins_deducted){
        res.status(202).send({message: 'not enough coins'});
      }
      else{
        let newItems = []
        if ('items' in u){
          newItems = [...u.items, item_id]
        }
        else{
          newItems = [item_id]
        }
      
        User.findOneAndUpdate({username:req.headers.username},
          {items: newItems,
          coins: coins-coins_deducted},
          { new: true }).
          then((u)=>{
          console.log(u);
          res.status(200).send({ message: 'success' });
        })
      }
    }
  })
});

module.exports = router;
