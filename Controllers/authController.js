// controllers/authController.js
const { User } = require('../models');
const jwt = require('jsonwebtoken');     // JWT library for token creation
const bcrypt = require('bcrypt');       // bcrypt for password hashing

// User sign-up handler
const handleSignUp = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // Create a JWT token
    const token = jwt.sign({ uid: newUser.uid }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the response with token and user data
    res.status(201).json({
      token,
      user: { email: newUser.email, username: newUser.username },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export handleSignUp
module.exports = { handleSignUp };
