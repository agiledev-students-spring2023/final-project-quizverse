
// a mongoose model of a user
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  item_id: Number,
  number_owned: Number,
  expiration_date: { type: Date, default: () => Date.now() }
  // note: potentially need more trackers
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 20 },
  email: { type: String, required: true, unique: true, trim: true, minlength: 5, maxlength: 50 },
  password: { type: String, required: true, minlength: 6, maxlength: 20 },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  streak: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
  items: [inventorySchema],
  sets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FlashcardSet' }],
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'History' }],
  dailyquizHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DailyQuizHistory' }]
});

// create a model from this schema
const User = mongoose.model("User", userSchema)

// export the model
module.exports = User
