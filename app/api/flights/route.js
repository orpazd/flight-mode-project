import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb'; // הקישור ל-db שהכנו קודם
import Flight from '../../models/Flight';   // המודל שהכנו קודם

export async function GET() {
  try {
    await dbConnect(); // מתחברים למונגו
    const flights = await Flight.find({}); // שולפים את כל הטיסות
    return NextResponse.json(flights); // מחזירים אותן כ-JSON לאתר
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch flights" }, { status: 500 });
  }
}