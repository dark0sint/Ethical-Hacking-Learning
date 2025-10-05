const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [{
    question: String,
    options: [String],
    correctAnswer: String
  }],
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  passingScore: { type: Number, default: 70 }
});

module.exports = mongoose.model('Quiz', quizSchema);
