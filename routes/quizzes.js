const express = require('express');
const Quiz = require('../models/Quiz');
const auth = require('../middleware/auth');

const router = express.Router();

// Get quiz by course ID
router.get('/course/:courseId', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ course: req.params.courseId });
    if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Submit quiz (simple scoring)
router.post('/submit/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    const { answers } = req.body;
    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (q.correctAnswer === answers[i]) score++;
    });
    const percentage = (score / quiz.questions.length) * 100;
    // Update user progress (simplified)
    res.json({ score: percentage, passed: percentage >= quiz.passingScore });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Create quiz (instructor only) - Sample ethical hacking quiz
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'instructor') return res.status(403).json({ msg: 'Access denied' });
  const quiz = new Quiz({
    ...req.body,
    questions: [
      { question: 'What does OWASP stand for?', options: ['Open Web App Security Project', 'Other options...'], correctAnswer: 'Open Web App Security Project' },
      // Add more ethical-focused questions
    ]
  });
  await quiz.save();
  res.status(201).json(quiz);
});

module.exports = router;
