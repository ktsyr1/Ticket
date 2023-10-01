import mongoose, { Schema } from 'mongoose';

const carRentalSchema = new Schema({
  image: String,
  price: Number,
  description: String,
  brand: String,
  model: String,
  transmission: String,
  fuelType: String,
  year: Number,
  insurance: String,
  seats: Number,
  pickupLocation: String,
  dropoffLocation: String,
  duration: String,
  childSeat: Boolean,
  priceIncludes: String,
  createdAt: { type: Date, default: Date.now },
});

mongoose.models = {};
export default mongoose.model('CarRental', carRentalSchema);
