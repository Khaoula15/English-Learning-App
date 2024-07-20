const express = require('express');
const router = express.Router();

// Get all lessons
router.get('/', (req, res) => {
  // Fetch lessons from the database
  res.json([
    { id: 1, title: 'Lesson 1', description: 'This is the first lesson' },
    { id: 2, title: 'Lesson 2', description: 'This is the second lesson' },
    { id: 3, title: 'Lesson 3', description: 'This is the third lesson' }
  ]);
});

module.exports = router;
