const mongoose = require('mongoose');
let Lesson;
Lesson = require('./models/Lesson');
const Flashcard = require('./models/Flashcard');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.log('MongoDB connection error:', err));

const seedFlashcards = async () => {
  try {
    // First, let's get the ID of the first lesson (assuming it exists)
    const lesson = await Lesson.findOne();
    if (!lesson) {
      console.log('No lesson found. Please seed lessons first.');
      return;
    }

    const flashcardsData = [
      { word: 'Hello', definition: 'A Greeting used to begin a conversation', question: 'What is the word "Hello" used for?' },
      { word: 'Goodbye', definition: 'A Farewell used when leaving', question: 'What is the word "Goodbye" used for?' },
      { word: 'Please', definition: 'A Polite way of asking for something', question: 'What is the word "Please" used for?' },
      { word: 'Thank you', definition: 'A polite expression of gratitude', question: 'What is the phrase "Thank you" used for?' },
      { word: 'Yes', definition: 'An affirmative response', question: 'What does the word "Yes" indicate?' },
      { word: 'No', definition: 'A Negative response', question: 'What does the word "No" indicate?' },
      { word: 'Help', definition: 'To Assist someone', question: 'What does the word "Help" mean?' },
      { word: 'Sorry', definition: 'An Expression of regret', question: 'What is the word "Sorry" used for?' },
      { word: 'Excuse me', definition: 'A Polite way to get someone\'s attention', question: 'What is the phrase "Excuse me" used for?' },
      { word: 'What is your name?', definition: 'A Question asking for someone\'s name', question: 'What does the question "What is your name?" ask for?' }
    ];

    // Add the lessonId to each flashcard
    const flashcardsWithLessonId = flashcardsData.map(flashcard => ({
      ...flashcard,
      lessonId: lesson._id
    }));

    // Delete existing flashcards
    await Flashcard.deleteMany({});

    // Insert new flashcards
    await Flashcard.insertMany(flashcardsWithLessonId);

    console.log('Flashcards seeded successfully!');
  } catch (error) {
    console.error('Error seeding flashcards:', error);
  } finally {
    await mongoose.connection.close();
  }
};

const seedDB = async () => seedFlashcards(); // Call the function

seedDB(); // Call the function
