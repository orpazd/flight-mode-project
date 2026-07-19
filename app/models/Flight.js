// app/models/Flight.js
import mongoose from 'mongoose';

const FlightSchema = new mongoose.Schema({
  to: String,
  airline: String,
  price: String,
  time: String,
  image: String
});

export default mongoose.models.Flight || mongoose.model('Flight', FlightSchema);