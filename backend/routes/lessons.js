const express = require('express');
const router = express.Router();

// Sample lessons data (you should replace this with a database query in a real application)
const lessons = [
  { id: 1, title: 'Lesson 1', description: 'This is the first lesson' },
  { id: 2, title: 'Lesson 2', description: 'This is the second lesson' },
  { id: 3, title: 'Lesson 3', description: 'This is the third lesson' }
];

// Sample flashcards for Lesson 1
const flashcards = [
  { id: 1, word: 'Hello', definition: 'A greeting used to begin a conversation.' },
  { id: 2, word: 'Goodbye', definition: 'A farewell used when leaving.' },
  { id: 3, word: 'Please', definition: 'A polite way of asking for something.' },
  { id: 4, word: 'Thank you', definition: 'A polite expression of gratitude.' },
  { id: 5, word: 'Yes', definition: 'An affirmative response.' },
  { id: 6, word: 'No', definition: 'A negative response.' },
  { id: 7, word: 'Help', definition: 'To assist someone.' },
  { id: 8, word: 'Sorry', definition: 'An expression of regret.' },
  { id: 9, word: 'Excuse me', definition: 'A polite way to get someone\'s attention.' },
  { id: 10, word: 'What is your name?', definition: 'A question asking for someone\'s name.' }
];

// Get all lessons
router.get('/', (req, res) => {
  res.json(lessons);
});

// Get a specific lesson by ID
router.get('/:id', (req, res) => {
  const lessonId = parseInt(req.params.id);
  const lesson = lessons.find(l => l.id === lessonId);
  if (lesson) {
    res.json(lesson);
  } else {
    res.status(404).json({ message: 'Lesson not found' });
  }
});

// Get flashcards for a specific lesson
router.get('/:id/flashcards', (req, res) => {
  const lessonId = parseInt(req.params.id);
  // For simplicity, returning the same flashcards for all lessons
  if (lessonId >= 1 && lessonId <= lessons.length) {
    return res.json(flashcards);
  }
  return res.status(404).json({ message: 'Flashcards not found for this lesson.' });
});

module.exports = router;

