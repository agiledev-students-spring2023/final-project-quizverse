//Routing for all of Daily Quiz Things
const express = require('express');
const axios = require('axios');
const router = express.Router();
const jwt_auth = require('./jwt');
const {FlashcardSet, Flashcard} = require('../schemas/flashcard-set-schema');
const User = require('../schemas/user-schema');
const DailyQuizHistory = require('../schemas/dailyquizHistory-schema');
const History = require('../schemas/history-schema');
const _ = require('underscore');

router.get('/daily-quiz', jwt_auth, async (req, res, next) => {
  // use axios to make a request to an API for flashcard data in the daily quiz
  user = req.headers.username;
  //Do something with a database lookup with user. For now, this is still just calling Mockaroo.
  // axios
  //   .get('https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0')
  //   .then((apiResponse) => res.json(apiResponse.data)) // pass data along directly to client
  //   .catch((err) => {
  //     // the server returned an error... probably too many requests... until we pay!

  //     // make some backup fake data
  //     const backupData = [
  //       {
  //         term: 'encryption',
  //         definition:
  //           'adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit'
  //       },
  //       {
  //         term: 'instruction set',
  //         definition:
  //           'convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam'
  //       },
  //       {
  //         term: 'contingency',
  //         definition:
  //           'elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue'
  //       },
  //       {
  //         term: 'Sharable',
  //         definition:
  //           'vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa'
  //       },
  //       {
  //         term: 'User-friendly',
  //         definition:
  //           'praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus'
  //       },
  //       {
  //         term: 'executive',
  //         definition: 'sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl'
  //       },
  //       {
  //         term: 'model',
  //         definition: 'elit proin interdum mauris non ligula pellentesque ultrices phasellus id'
  //       },
  //       {
  //         term: 'Ergonomic',
  //         definition:
  //           'massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi'
  //       },
  //       {
  //         term: 'intangible',
  //         definition:
  //           'porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis'
  //       },
  //       {
  //         term: 'challenge',
  //         definition: 'luctus rutrum nulla tellus in sagittis dui vel nisl duis ac'
  //       }
  //     ];
  //     res.json(backupData);
  //   });
  User.findOne({username: req.headers.username}).populate("sets").then((u)=>{
    let all_flashcards = []
    let test = u.sets.map((set)=>{
      set.flashcards.map((flashcard)=>{
        all_flashcards.push({
          term:flashcard.term,
          definition: flashcard.definition,
          set_id: set._id
        })
      })
    })
    //NOTE: Cut our flashcards down to 10 for the daily quiz. We could try and customize this later.
    if (all_flashcards.length > 10){
      all_flashcards = _.sample(all_flashcards, 10)
    }
    //RANDOMIZE the order of our daily quiz flashcards.
    //If someone wants to implement an algorithm, feel free to do so here.
    all_flashcards = _.shuffle(all_flashcards)
    res.json(all_flashcards).status(200)
  })
  
});
// Creating a POST request for daily quiz
router.post('/study-stats', async (req, res) => {
  let correct = req.body.correct
  let incorrect = req.body.incorrect
  const username = req.headers.username
  let answers = []
  correct.map((o)=>{
    answers.push({
      term: o.term,
      set_id: o.set_id,
      correctness: true
    })
  })
  incorrect.map((o)=>{
    answers.push({
      term: o.term,
      set_id: o.set_id,
      correctness: false
    })
  })

  let todays_stats = new DailyQuizHistory({
    dayOfQuiz: new Date(),
    percentageCorrect: correct.length/(Math.max(correct.length+incorrect.length,10)),
    answers: answers
  })

  try {
    todays_stats.save();
  } catch (err) {
    console.log('error when saving new set' + err);
    res.status(500).send({ message: 'error' });
  }
  User.findOne({username: req.headers.username}).then((u)=>{
    let combinedHistory = [...u.dailyquizHistory, todays_stats]
    let c = u.coins
    User.findOneAndUpdate({username:req.headers.username},
      {dailyquizHistory:combinedHistory,
      coins: c+correct.length,
      streak: u.streak + 1},
      {new: true}
      ).then((u)=>{
        console.log(`updated user: ${u}`);
      })
  })
  /*
  * Now dealing with history schema. THIS DOES NOT WORK. Not sure how to fix this.
  */
  User.findOne({username: req.headers.username}).then((u)=>{
    let history = u.history
    let found = false
    answers.map((answer)=>{
    //   for (i=0; i<history.length; i++){
    //     if (history[i].term === answer.term){
    //       //Case where the term is already in the history, and we got it correct
    //       if (answer.correctness){
    //         let newHistory = history
    //         newHistory[i] = {
    //           term: history[i].term,
    //           right: history[i].right + 1,
    //           wrong: history[i].wrong,
    //           percent_correct: (history[i].right+1)/(history[i].right+history[i].wrong+1),
    //           set_id: history[i].set_id
    //         }
    //         User.findOneAndUpdate({username:req.headers.username},
    //           {history: newHistory},
    //           {new:true}).then((us)=>{
    //             console.log(us)
    //           })
    //         found = true
    //       }
    //       //Case where the term is already in the history, and we got it incorrect
    //       else{
    //         let newHistory = history
    //         newHistory[i] = {
    //           term: history[i].term,
    //           right: history[i].right,
    //           wrong: history[i].wrong+1,
    //           percent_correct: history[i].right/(history[i].right+history[i].wrong+1),
    //           set_id: history[i].set_id
    //         }
    //         User.findOneAndUpdate({username:req.headers.username},
    //           {history: newHistory},
    //           {new:true}).then((us)=>{
    //             console.log(us)
    //           })
    //         found = true
    //       }
    //       break
    //     }
    //   }
      //Case where this word needs to be added to the history
      // if (!found){
      //   let newHistory = []
      //   // if (newHistory == undefined){
      //   //   newHistory = []
      //   // }
      //   newHistory = [...newHistory, {
      //     term: answer.term,
      //     right: (answer.correctness ? 1 : 0),
      //     wrong: (answer.correctness ? 0 : 1),
      //     percent_correct: (answer.correctness? 1: 0),
      //     set_id: answer.set_id
      //   }]
      //   User.findOneAndUpdate({username:req.headers.username},
      //     {history: newHistory},
      //     {new:true}).then((us)=>{
      //       // console.log(us)
      //   })

      // }

    })
  })


  /*
  * Dealing with the dailyquizHistory-schema first
  */

  // axios
  //   .post('https://my.api.mockaroo.com/generic_post.json?key=6b3bc3e0&__method=POST', req.body)
  //   .then(console.log('Succesfully sent to database'))
  //   .catch((err) => next(err));
  const data = {
    status: 'Amazing success!',
    message: 'Congratulations on sending us this data!',
    your_data: req.body
  };
  // ... then send a response of some kind to client
  res.json(data);
});

module.exports = router;
