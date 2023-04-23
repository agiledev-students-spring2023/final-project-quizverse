//Routing for all of Daily Quiz Things
const express = require('express');
const axios = require('axios');
const router = express.Router();
const User = require('../schemas/user-schema')
const jwt_auth = require('./jwt');


///foo?foo=${foo}&baz=${baz}
router.get('/home', jwt_auth, async (req, res, next) => {
  // use axios to make a request to an API for flashcard data in the daily quiz
  const data = {}
  User.findOne({ username: req.headers.username} ).
  then(
    u => {              
      // if (!u.username ==null&& !u.streak==null && !u.coins==null){
    const data = {
      username: u.username,
      streak: u.streak,
      coins: u.coins
    }
    res.json(data);
  }
    // else{
    //   res.status(401).send("Invalid User");
    // }
  ).
  catch( /* res.status(405).send('Invalid Username')*/)
 ;
  
//   axios('https://my.api.mockaroo.com/users.json?key=6b3bc3e0')
//     .then((apiResponse) => res.json(apiResponse.data))
//     .catch((err) => {
//       // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
//       //console.log(`Sorry, buster.  No more requests allowed today!`);
//       // the server returned an error... probably too many requests... until we pay!

//       // make some backup fake data
//       const backupData = [
//         {
//           username: 'udottrell0',
//           first_name: 'Ulrich',
//           last_name: 'Dottrell',
//           email: 'udottrell0@newyorker.com',
//           coins: 34,
//           streak: 14
//         },
//         {
//           username: 'fgrandin1',
//           first_name: 'Fannie',
//           last_name: 'Grandin',
//           email: 'fgrandin1@360.cn',
//           coins: 59,
//           streak: 71
//         },
//         {
//           username: 'tbraundt2',
//           first_name: 'Thorin',
//           last_name: 'Braundt',
//           email: 'tbraundt2@ucoz.ru',
//           coins: 42,
//           streak: 17
//         },
//         {
//           username: 'drahl3',
//           first_name: 'Dun',
//           last_name: 'Rahl',
//           email: 'drahl3@joomla.org',
//           coins: 89,
//           streak: 47
//         },
//         {
//           username: 'gwimlett4',
//           first_name: 'Gothart',
//           last_name: 'Wimlett',
//           email: 'gwimlett4@ning.com',
//           coins: 68,
//           streak: 48
//         },
//         {
//           username: 'nlacroux5',
//           first_name: 'Nester',
//           last_name: 'Lacroux',
//           email: 'nlacroux5@github.io',
//           coins: 51,
//           streak: 29
//         },
//         {
//           username: 'gwasselin6',
//           first_name: 'Gwendolen',
//           last_name: 'Wasselin',
//           email: 'gwasselin6@photobucket.com',
//           coins: 96,
//           streak: 66
//         },
//         {
//           username: 'hscrymgeour7',
//           first_name: 'Hollie',
//           last_name: 'Scrymgeour',
//           email: 'hscrymgeour7@biblegateway.com',
//           coins: 60,
//           streak: 91
//         },
//         {
//           username: 'sgoldsworthy8',
//           first_name: 'Sandra',
//           last_name: 'Goldsworthy',
//           email: 'sgoldsworthy8@timesonline.co.uk',
//           coins: 88,
//           streak: 4
//         },
//         {
//           username: 'fkondratenko9',
//           first_name: 'Frants',
//           last_name: 'Kondratenko',
//           email: 'fkondratenko9@ebay.co.uk',
//           coins: 86,
//           streak: 33
//         }
//       ];
//       res.json(backupData);
//     });
//   // eslint-disable-next-line
});
module.exports = router;
