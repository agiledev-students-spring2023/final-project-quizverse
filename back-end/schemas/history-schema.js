const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  term: String,
  right: Number,
  wrong: Number,
  percent_correct: Number,
  set_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FlashcardSet' }
});

// for team debate:
/* 
  master history that has each answer ever, identified by their set_id field
  OR
  have a list of history documents that are each specific to a set

  results in easier statistics or easier set studying
*/

const historySchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answers: [answerSchema]
});

module.exports = mongoose.model('History', historySchema);
