const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  word: {
    type: String,
    required: true
  },
  definition: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Flashcard', FlashcardSchema);
