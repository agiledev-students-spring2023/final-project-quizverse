const mongoose = require('mongoose');
// import { User } from './user-schema';
const Schema = mongoose.Schema;

const flashcardSchema = mongoose.Schema({
  term: { type: String, required: true },
  definition: { type: String, required: true }
});

// TODO: Need to make createdBy a reference to the User schema
const flashcardSetSchema = new Schema({
  title: { type: String, required: true, unique: false, trim: true, minlength: 3, maxlength: 20 },
  description: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 5,
    maxlength: 50
  },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  editedAt: { type: Date, default: () => Date.now() },
  flashcards: [flashcardSchema]
});

const FlashcardSet = mongoose.model('FlashcardSet', flashcardSetSchema)
const Flashcard = mongoose.model('Flashcard', flashcardSchema)

module.exports = {
  FlashcardSet: FlashcardSet,
  Flashcard: Flashcard
};
