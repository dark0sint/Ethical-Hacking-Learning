const mongoose = require('mongoose');

const forumPostSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Best Tools for Ethical Network Scanning"
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, // Optional, tie to course
  replies: [{
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
    createdAt: { type: Date, default: Date.now }
  }],
  isApproved: { type: Boolean, default: false } // Moderation for ethical content
}, { timestamps: true });

module.exports = mongoose.model('ForumPost', forumPostSchema);
