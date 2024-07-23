const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Middleware to check if user has paid for premium content
const checkPayment = (req, res, next) => {
  if (req.params.id == 3) {
    const user = req.user;
    if (user && user.hasPaid) {
      return next();
    } else {
      return res.status(403).json({ message: 'Access denied. Please purchase the lesson.' });
    }
  }
  next();
};

// Sample lessons data (you should replace this with a database query in a real application)
const lessons = [
  { id: 1, title: 'Lesson 1', description: 'This is the first lesson' },
  { id: 2, title: 'Lesson 2', description: 'This is the second lesson' },
  { id: 3, title: 'Lesson 3', description: 'This is the third lesson' },
  { id: 4, title: 'Advanced Conversations', description: 'Complex dialogue structures for fluent speakers', isPremium: true }
];

// Sample flashcards for Lesson 1
const flashcards = [
  { id: 1, word: 'Hello', definition: 'A Greeting used to begin a conversation', question: 'What is the word "Hello" used for?' },
  { id: 2, word: 'Goodbye', definition: 'A Farewell used when leaving', question: 'What is the word "Goodbye" used for?' },
  { id: 3, word: 'Please', definition: 'A Polite way of asking for something', question: 'What is the word "Please" used for?' },
  { id: 4, word: 'Thank you', definition: 'A polite expression of gratitude', question: 'What is the phrase "Thank you" used for?' },
  { id: 5, word: 'Yes', definition: 'An affirmative response', question: 'What does the word "Yes" indicate?' },
  { id: 6, word: 'No', definition: 'A Negative response', question: 'What does the word "No" indicate?' },
  { id: 7, word: 'Help', definition: 'To Assist someone', question: 'What does the word "Help" mean?' },
  { id: 8, word: 'Sorry', definition: 'An Expression of regret', question: 'What is the word "Sorry" used for?' },
  { id: 9, word: 'Excuse me', definition: 'A Polite way to get someone\'s attention', question: 'What is the phrase "Excuse me" used for?' },
  { id: 10, word: 'What is your name?', definition: 'A Question asking for someone\'s name', question: 'What does the question "What is your name?" ask for?' }
];

// Get all lessons
router.get('/', (req, res) => {
  res.json(lessons);
});

// Get a specific lesson by ID
router.get('/:id', auth, checkPayment, (req, res) => {
  const lessonId = parseInt(req.params.id);
  const lesson = lessons.find(l => l.id === lessonId);
  if (lesson) {
    res.json(lesson);
  } else {
    res.status(404).json({ message: 'Lesson not found' });
  }
});

// Get flashcards for a specific lesson
router.get('/:id/flashcards', auth, checkPayment, (req, res) => {
  const lessonId = parseInt(req.params.id);
  // For simplicity, returning the same flashcards for all lessons
  if (lessonId >= 1 && lessonId <= lessons.length) {
    return res.json(flashcards);
  }
  return res.status(404).json({ message: 'Flashcards not found for this lesson.' });
});

// Check flashcard definition
router.post('/:lessonId/flashcards/:flashcardId/check', (req, res) => {
  const { lessonId, flashcardId } = req.params;
  const { userDefinition } = req.body;

  const flashcard = flashcards.find(f => f.id === parseInt(flashcardId));

  if (!flashcard) {
    return res.status(404).json({ message: 'Flashcard not found' });
  }

  const isCorrect = userDefinition.toLowerCase() === flashcard.definition.toLowerCase();

  res.json({
    isCorrect,
    correctDefinition: flashcard.definition
  });
});

// Update user progress
router.post('/:id/progress', auth, async (req, res) => {
  const lessonId = parseInt(req.params.id);
  const { completed, score } = req.body;
  
  try {
    const user = await User.findById(req.user.id);
    if (!user.progress) user.progress = {};
    user.progress[lessonId] = { completed, score };
    await user.save();
    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating progress' });
  }
});

module.exports = router;
