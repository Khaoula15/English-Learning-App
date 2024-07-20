const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    user.comparePassword(password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
      res.json({ token });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
