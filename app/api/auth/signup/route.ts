import { User } from '../../../../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export const handleSignUp = async (req: Request, res: Response): Promise<Response> => {
  const { email, username, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user with hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ uid: newUser.uid }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Send response
    return res.status(201).json({
      token,
      user: { email: newUser.email, username: newUser.username },
    });
  } catch (error) {
    console.error('Error during sign-up:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
