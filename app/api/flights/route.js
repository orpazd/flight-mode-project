import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb'; 
import Flight from '@/app/models/Flight'; 

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // הדפסה לבדיקה בטרמינל
    console.log("נתונים שהתקבלו בשרת:", data);

    let finalDate = data.date || data.Dates;
    if (!finalDate && (data.departureDate || data.returnDate)) {
      finalDate = `${data.departureDate || ''} - ${data.returnDate || ''}`;
    }

    const flightData = {
      destination: data.destination || data.to || "יעד לא צוין",
      to: data.destination || data.to || "יעד לא צוין",
      airline: data.airline || data.Airline || "לא צוין",
      Airline: data.airline || data.Airline || "לא צוין",
      departureDate: data.departureDate || "",
      returnDate: data.returnDate || "",
      date: finalDate || "לא צוין",
      Dates: finalDate || "לא צוין",
      time: data.time || data.time2 || "לא צוין",
      price: data.price || "צור קשר",
      image: data.image || "",
      category: data.category || "flights"
    };

    const newFlight = await Flight.create(flightData);
    return NextResponse.json(newFlight, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 