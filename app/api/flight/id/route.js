import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Flight from '../../../models/Flight';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const flight = await Flight.findById(params.id);
    if (!flight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }
    return NextResponse.json(flight);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}