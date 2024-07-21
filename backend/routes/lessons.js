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
  { id: 1, word: 'Hello', definition: 'A greeting used to begin a conversation.', question: 'What is the word "Hello" used for?' },
  { id: 2, word: 'Goodbye', definition: 'A farewell used when leaving.', question: 'What is the word "Goodbye" used for?' },
  { id: 3, word: 'Please', definition: 'A polite way of asking for something.', question: 'What is the word "Please" used for?' },
  { id: 4, word: 'Thank you', definition: 'A polite expression of gratitude.', question: 'What is the phrase "Thank you" used for?' },
  { id: 5, word: 'Yes', definition: 'An affirmative response.', question: 'What does the word "Yes" indicate?' },
  { id: 6, word: 'No', definition: 'A negative response.', question: 'What does the word "No" indicate?' },
  { id: 7, word: 'Help', definition: 'To assist someone.', question: 'What does the word "Help" mean?' },
  { id: 8, word: 'Sorry', definition: 'An expression of regret.', question: 'What is the word "Sorry" used for?' },
  { id: 9, word: 'Excuse me', definition: 'A polite way to get someone\'s attention.', question: 'What is the phrase "Excuse me" used for?' },
  { id: 10, word: 'What is your name?', definition: 'A question asking for someone\'s name.', question: 'What does the question "What is your name?" ask for?' }
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

module.exports = router;
