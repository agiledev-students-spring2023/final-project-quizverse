// getting-started.js
const mongoose = require('mongoose');
const User = require('./schemas');

main().catch((err) => console.log(err));
// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
async function main() {
  await mongoose.connect(
    'mongodb+srv://QuizVerseUser:QuizVerse@quizverse.zkgvem0.mongodb.net/?retryWrites=true&w=majority'
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
  const user1 = new User({ name: 'Bob', age: 123 });
  await user1.save();
  try {
    const user2 = await User.create({
      name: 'Sally',
      age: 27,
      hobbies: ['basketball', 'jump rope'],
      address: { city: 'New York' }
    });
    console.log(user2);
  } catch (e) {
    console.log(e.message);
  }
}
