import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  foodChoices: [{
    title: String,
    selected: Boolean
  }],
  movieChoices: [{
    title: String,
    selected: Boolean
  }],
  dateTime: {
    date: String,
    time: String
  },
  rating: {
    type: String,
    default: "0"
  },
  respondedAt: {
    type: Date,
    default: Date.now
  }
});

export const Response = mongoose.model('Response', responseSchema);
