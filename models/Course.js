const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Introduction to Ethical Hacking"
  description: { type: String, required: true },
  category: { type: String, default: 'ethical-hacking' }, // Focus on ethical topics
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
  isPublished: { type: Boolean, default: false }
});

module.exports = mongoose.model('Course', courseSchema);
