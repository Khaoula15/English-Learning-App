const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isPremium: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Lesson', LessonSchema);
