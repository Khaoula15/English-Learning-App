const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const auth = require('../middleware/auth');

// Get all lessons
router.get('/', auth, async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a specific lesson
router.get('/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ msg: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Lesson not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
