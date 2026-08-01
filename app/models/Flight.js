import mongoose from 'mongoose';

const FlightSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  to: { type: String },
  price: { type: String, required: true },
  airline: { type: String, required: true },
  Airline: { type: String },
  departureDate: { type: String },
  returnDate: { type: String },
  date: { type: String },
  Dates: { type: String },
  time: { type: String },
  image: { type: String },
  category: { type: String }
}, { timestamps: true });

export default mongoose.models.Flight || mongoose.model('Flight', FlightSchema);