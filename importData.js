const mongoose = require('mongoose');
// כאן את צריכה להחליף את הנתיב למיקום האמיתי של הקובץ שלך
const data = require('./data.json'); 

async function run() {
  await mongoose.connect('mongodb://127.0.0.1:27017/flight-mode-db');
  
  // מכניס את הטיסות לתוך ה-Collection שנקרא flights
  await mongoose.connection.db.collection('flights').insertMany(data.flights);
  
  console.log("הטיסות הועברו בהצלחה!");
  process.exit();
}
run();