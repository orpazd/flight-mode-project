import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb'; // הקישור ל-db שהכנו קודם
import Flight from '../../models/Flight';   // המודל שהכנו קודם

// הפונקציה הקיימת שלך (שליפת טיסות)
export async function GET() {
  try {
    await dbConnect(); // מתחברים למונגו
    const flights = await Flight.find({}); // שולפים את כל הטיסות
    return NextResponse.json(flights); // מחזירים אותן כ-JSON לאתר
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch flights" }, { status: 500 });
  }
}

// הפונקציה החדשה להוספת טיסה (POST)
export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // יצירת אובייקט במבנה אחיד
    const normalizedData = {
      to: data.to || data.destination || data.Where || "יעד לא צוין",
      Airline: data.Airline || data.airline || "לא צוין",
      Dates: data.Dates || data.date || "לא צוין",
      time: data.time || data.time2 || "לא צוין",
      price: data.price || "צור קשר"
    };

    const newFlight = await Flight.create(normalizedData);
    return NextResponse.json(newFlight, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}