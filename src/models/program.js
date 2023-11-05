import mongoose, { Schema } from 'mongoose';

const programSchema = new Schema({
  title: String, 
  duration: String,
  price: Number,
  numberOfPeople: String,
  description: String,
  overview: String,
  includes: String,
  excludes: String,
  image: String,
  plan: [
    {
      image: String,
      title: String,
      description: String,
      sortDay: Number,
      activities: String,
    },
  ], 
  createdAt: { type: Date, default: Date.now },
});

mongoose.models = {};
export default mongoose.model('program', programSchema);
