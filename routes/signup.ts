import express, { Request, Response } from 'express';
import { handleSignUp } from '../controllers/authController';

const router = express.Router();

// POST endpoint to handle user sign-up
router.post('/signup', async (req: Request, res: Response) => {
  try {
    await handleSignUp(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; // Ensure it's exported as default
