import { NextResponse } from 'next/server';
import dbConnect from '../../../../app/lib/mongodb';
import Flight from '../../../models/Flight';

// ה-GET הקיים שלך נשאר ללא שינוי (רק שים לב שה-ID ב-params יחייב שליחה דינמית)
export async function GET(request, { params }) {
  try {
    // const { searchParams } = new URL(request.url);
    // const id = searchParams.get('id'); // דרך פשוטה יותר לשלוף ID אם הוא ב-Query string
    
    const { id } = await params;
    console.log("Fetching flight with ID:"); // הוספת לוג כדי לבדוק את הנתונים
    console.log("ID:", id); // הוספת לוג כדי לבדוק את הנתונים

    await dbConnect();

    if (id) {
        const flight = await Flight.findById(id);

        console.log("Flight fetched:", flight); // הוספת לוג כדי לבדוק את הנתונים
        if (!flight) return NextResponse.json({ error: "Flight not found" }, { status: 404 });

        return NextResponse.json(flight);
    }

    // אם אין ID, נחזיר את כל הטיסות (שימושי לעמוד הטיסות)
    const flights = await Flight.find({});
    return NextResponse.json(flights);
  } catch (error) {
    console.error("Error fetching flight:", error); // הוספת לוג כדי לבדוק את הנתונים
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

// הוספת פונקציה למנהל: יצירת טיסה חדשה
export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const newFlight = await Flight.create(data);
    return NextResponse.json(newFlight, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create flight" }, { status: 500 });
  }
}

// הוספת פונקציה למנהל: מחיקת טיסה
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await dbConnect();
    await Flight.findByIdAndDelete(id);
    return NextResponse.json({ message: "Flight deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete flight" }, { status: 500 });
  }
}