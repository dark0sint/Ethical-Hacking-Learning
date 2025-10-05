const express = require('express');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all published courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate('instructor', 'username').populate('lessons');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get single course with lessons
router.get('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('lessons');
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Create course (instructor only) - Example data for ethical hacking
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'instructor') return res.status(403).json({ msg: 'Access denied' });
  try {
    const course = new Course({
      ...req.body,
      instructor: req.user.id
    });
    await course.save();
    // Sample lesson creation (in real app, use separate endpoint)
    const lesson = new Lesson({
      title: 'Ethical Hacking Basics',
      content: 'Introduction to legal penetration testing. Always get permission!',
      course: course._id,
      duration: 30
    });
    await lesson.save();
    course.lessons.push(lesson._id);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
