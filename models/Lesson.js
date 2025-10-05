const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "What is Penetration Testing?"
  content: { type: String, required: true }, // Text, video URL, or embedded resource
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  duration: { type: Number } // In minutes
});

module.exports = mongoose.model('Lesson', lessonSchema);
