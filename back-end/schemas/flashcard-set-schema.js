const mongoose = require('mongoose');
import { User } from './user-schema';
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
  createdBy: { type: User, required: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  editedAt: { type: Date, default: () => Date.now() },
  flashcards: { type: Array, default: [] }
});

module.exports = mongoose.model('FlashcardSet', flashcardSetSchema);
