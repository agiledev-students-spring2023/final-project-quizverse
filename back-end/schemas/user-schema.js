
// a mongoose model of a user
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtStrategy = require("../routes/jwt-config.js") // import setup options for using JWT in passport

const inventorySchema = new Schema({
  item_id: Number,
  number_owned: Number,
  expiration_date: { type: Date, default: () => Date.now() }
  // note: potentially need more trackers
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  streak: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
  items: [inventorySchema],
  sets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FlashcardSet' }],
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'History' }],
  dailyquizHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DailyQuizHistory' }]
});

// hash the password before the user is saved
// mongoose provides hooks that allow us to run code before or after specific events
// userSchema.pre("save", function (next) {
//   const user = this
//   // if the password has not changed, no need to hash it
//   if (!user.isModified("password")) return next()
//   // otherwise, the password is being modified, so hash it
//   bcrypt.hash(user.password, 10, (err, hash) => {
//     if (err) return next(err)
//     user.password = hash // update the password to the hashed version
//     next()
//   })
// })

// mongoose allows us to attach methods to a model...

// compare a given password with the database hash
// userSchema.methods.validPassword = function (password) {
//   return bcrypt.compareSync(password, this.password)
// }

// create a model from this schema
const User = mongoose.model("User", userSchema)

// export the model
module.exports = User
