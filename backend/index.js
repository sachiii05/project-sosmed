import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Response } from './models/Response.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Save response
app.post('/api/responses', async (req, res) => {
  try {
    const { foodChoices, movieChoices, dateTime, rating } = req.body;
    const response = new Response({
      foodChoices,
      movieChoices,
      dateTime,
      rating,
      respondedAt: new Date()
    });
    await response.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all responses
app.get('/api/responses', async (req, res) => {
  try {
    const responses = await Response.find().sort({ respondedAt: -1 });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
