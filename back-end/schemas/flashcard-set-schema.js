const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flashcardSetSchema = new Schema({
  title: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 20 },
  description: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 50
  },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  editedAt: { type: Date, default: () => Date.now() },
  flashcards: { type: Array, default: [] }
});

module.exports = mongoose.model('FlashcardSet', flashcardSetSchema);
