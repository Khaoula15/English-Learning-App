const mongoose = require('mongoose');
const Lesson = require('./models/Lesson');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.log('MongoDB connection error:', err));

const seedLessons = [
  { title: 'Lesson 1: Basic Greetings', description: 'Learn common greetings in English', isPremium: false },
  { title: 'Lesson 2: Numbers and Counting', description: 'Master numbers and basic counting', isPremium: false },
  { title: 'Lesson 3: Everyday Phrases', description: 'Essential phrases for daily conversations', isPremium: false },
  { title: 'Lesson 4: Advanced Conversations', description: 'Complex dialogue structures for fluent speakers', isPremium: true }
];

const seedDB = async () => {
  try {
    await Lesson.deleteMany({});
    await Lesson.insertMany(seedLessons, { ordered: false });
  } finally {
    mongoose.connection.close();
  }
  console.log('Database seeded!');
};

seedDB();
