const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 20 },
  password: { type: String, required: true, minlength: 6, maxlength: 20 },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  streak: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
  items: { type: Array, default: [] }
});

module.exports = mongoose.model('User', userSchema);
