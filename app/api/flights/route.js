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
    await dbConnect(); // מתחברים למונגו
    const data = await request.json(); // קוראים את הנתונים שנשלחו מהטופס
    
    // יצירת טיסה חדשה במסד הנתונים
    const newFlight = await Flight.create(data);
    
    return NextResponse.json(newFlight, { status: 201 }); // מחזירים אישור שהטיסה נוצרה
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}