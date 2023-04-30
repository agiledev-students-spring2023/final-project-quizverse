const { Int32, Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema for packaged daily quiz answers to be stored in user history, specifically under their history of daily quiz answers
const termSchema = new Schema({
  term: String,
  set_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FlashcardSet' },
  definition: String,
  correctness: Boolean
});

// algorithm for determining daily quiz priority -  to be discussed
/*
  potentially assign priority based on when was the last time it was wrong 
  and how many times it was gotten correct since the last time it was wrong 
 */

const dailyquizSchema = new Schema({
  username: String,
  dayOfQuiz: Date,
  percentageCorrect: Number,
  answers: [termSchema]
});

module.exports = mongoose.model('DailyQuizHistory',dailyquizSchema);
