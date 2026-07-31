import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb'; 
import Flight from '../../models/Flight'; 

// מכריח את השרת לא לשמור מטמון ותמיד לשלוף נתונים חדשים ממסד הנתונים
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// שליפת כל הטיסות (GET)
export async function GET() {
  try {
    await dbConnect(); 
    const flights = await Flight.find({}); 
    return NextResponse.json(flights, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    }); 
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch flights" }, { status: 500 });
  }
}

// הוספת טיסה חדשה (POST)
export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const normalizedData = {
      to: data.to || data.destination || data.Where || "יעד לא צוין",
      Airline: data.Airline || data.airline || "לא צוין",
      Dates: data.Dates || data.date || "לא צוין",
      time: data.time || data.time2 || "לא צוין",
      price: data.price || "צור קשר",
      image: data.image || "" 
    };

    const newFlight = await Flight.create(normalizedData);
    return NextResponse.json(newFlight, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}