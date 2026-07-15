// seed.js
const mongoose = require('mongoose');
const data = require('./data.json'); // הנתונים הישנים שלנו

async function seed() {
  await mongoose.connect('mongodb://127.0.0.1:27017/flight-mode-db');
  console.log("Connected to MongoDB!");

  // מוחקים נתונים ישנים כדי למנוע כפילויות
  await mongoose.connection.db.collection('flights').deleteMany({});
  
  // מכניסים את הנתונים החדשים
  await mongoose.connection.db.collection('flights').insertMany(data.flights);
  
  console.log("Database seeded!");
  process.exit();
}

seed();