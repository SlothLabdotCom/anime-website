import express from 'express';
import dotenv from 'dotenv';
import signupRouter from './routes/signup';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the signup route
app.use('/api', signupRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
