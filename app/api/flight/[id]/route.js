import { NextResponse } from 'next/server';
import dbConnect from '../../../../app/lib/mongodb';
import Flight from '../../../models/Flight';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    console.log("1. API called for ID:", id); // נראה בטרמינל אם ה-API בכלל מופעל

    await dbConnect();
    const flight = await Flight.findById(id);
    
    console.log("2. Flight found in DB:", flight); // נראה אם הוא מצא משהו במסד הנתונים

    if (!flight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }
    
    return NextResponse.json(flight);
  } catch (error) {
    console.error("3. Error in API:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}