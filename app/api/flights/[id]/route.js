import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Flight from '@/app/models/Flight';

// עדכון טיסה (PUT)
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const data = await request.json();

    const updatedFlight = await Flight.findByIdAndUpdate(id, data, { new: true });

    if (!updatedFlight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    return NextResponse.json(updatedFlight, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// מחיקת טיסה (DELETE)
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    // מנסה למחוק לפי _id של מונגוז, ואם לא מצליח מנסה לחפש לפי id רגיל
    let deletedFlight = await Flight.findByIdAndDelete(id);
    
    if (!deletedFlight) {
      deletedFlight = await Flight.findOneAndDelete({ id: id });
    }

    if (!deletedFlight) {
      return NextResponse.json({ error: "Flight not found in database" }, { status: 404 });
    }

    return NextResponse.json({ message: "Flight deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}