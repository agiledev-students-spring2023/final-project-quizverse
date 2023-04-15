const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  term: String,
  right: Int32,
  wrong: Int32
});

// for each set, store a document containing a user's answer history
const historySchema = new Schema({
  set: { type: mongoose.Schema.Types.ObjectId, ref: 'FlashcardSet' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answers: [answerSchema]
});

module.exports = mongoose.model('History', historySchema);
