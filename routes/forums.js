const express = require('express');
const ForumPost = require('../models/ForumPost');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all approved posts
router.get('/', async (req, res) => {
  try {
    const posts = await ForumPost.find({ isApproved: true }).populate('author', 'username').populate('replies.author', 'username').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Create post (ethical content only - manual moderation in prod)
router.post('/', auth, async (req, res) => {
  try {
    const post = new ForumPost({
      ...req.body,
      author: req.user.id
    });
    await post.save();
    // In prod, queue for admin approval
    post.isApproved = true; // Auto-approve for demo
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// Add reply
router.post('/:id/reply', auth, async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    post.replies.push({
      content: req.body.content,
      author: req.user.id
    });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
