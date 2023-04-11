const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
  street: String,
  city: String
});
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 1 },
  age: { type: Number, min: 0, max: 255, validate: { validator: (v) => v % 2 === 0 } },
  email: { type: String, lowercase: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
  bestFriend: mongoose.SchemaTypes.ObjectId,
  hobbies: [String],
  address: addressSchema
});
module.exports = mongoose.model('User', userSchema);
