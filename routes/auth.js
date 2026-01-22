const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// Register or login user
router.post('/register', async (req, res) => {
  try {
    const { uid, email, displayName, photoURL, provider } = req.body;

    // Check if user already exists
    let user = await User.findOne({ uid });

    if (user) {
      return res.status(200).json({
        message: 'User logged in successfully',
        user
      });
    }

    // Create new user
    user = new User({
      uid,
      email,
      displayName,
      photoURL: photoURL || '',
      provider,
      role: 'user' // Default role
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Get current user
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user role (admin only)
router.patch('/role/:userId', verifyToken, async (req, res) => {
  try {
    const { role } = req.body;
    const { userId } = req.params;

    // Check if requester is admin
    const requester = await User.findOne({ uid: req.user.uid });
    if (requester.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User role updated successfully',
      user
    });
  } catch (error) {
    console.error('Update role error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;