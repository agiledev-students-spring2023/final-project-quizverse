const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./schemas/user-schema');

dotenv.config();

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;

main().catch((err) => console.log(err));
// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
async function main() {
  await mongoose.connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DB}.zkgvem0.mongodb.net/?retryWrites=true&w=majority`
  );
  console.log('YOYLECAKE');
  const kittySchema = new mongoose.Schema({
    name: String
  });
  // NOTE: methods must be added to the schema before compiling it with mongoose.model()
  kittySchema.methods.speak = function speak() {
    const greeting = this.name ? 'Meow name is ' + this.name : "I don't have a name";
    console.log(greeting);
  };
  const Kitten = mongoose.model('Kitten', kittySchema);
  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'
  const fluffy = new Kitten({ name: 'fluffy' });
  fluffy.speak(); // "Meow name is fluffy"
  await fluffy.save();
  fluffy.speak();
  const kittens = await Kitten.find();
  console.log(kittens);
  await Kitten.find({ name: /^fluff/ });
  const user1 = new User({ username: 'Bob', password: 'default!password' });
  await user1.save();
  try {
    const user2 = await User.create({
      username: 'Sally',
      password: 'quizVerse!'
    });
    console.log(user2);
  } catch (e) {
    console.log(e.message);
  }
}
