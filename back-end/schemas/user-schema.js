const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  item_id: Number,
  expiration_date: Date
  // note: potentially need more trackers
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 20 },
  email: { type: String, required: true, unique: true, trim: true, minlength: 5, maxlength: 50 },
  password: { type: String, required: true, minlength: 6, maxlength: 20 },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  streak: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
  items: { type: Array, default: [] },
  sets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FlashcardSet' }],
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'History' }],
  dailyquizHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DailyQuizHistory' }],
  inventorySchema: [inventorySchema]
});

module.exports = mongoose.model('User', userSchema);
