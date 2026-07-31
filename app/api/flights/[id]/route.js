import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Flight from '../../models/Flight';
import { mongoose } from 'mongoose';

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const id = params.id;
    const data = await request.json();

// בדיקה מקיפה של כל שדה אפשרי לתאריך
    let finalDate = data.date || data.Dates || data.departureDate || data.returnDate;
    
    // אם יש גם הלוך וגם חזור נפרדים
    if (data.departureDate && data.returnDate) {
      finalDate = `${data.departureDate} - ${data.returnDate}`;
    }

    const normalizedData = {
      destination: data.destination || data.to || "",
      to: data.destination || data.to || "",
      airline: data.airline || data.Airline || "",
      Airline: data.airline || data.Airline || "",
      date: finalDate || "",
      Dates: finalDate || "",
      price: data.price || "",
      image: data.image || ""
    };

    let updatedFlight = null;

    // 1. ננסה לעדכן לפי ה-ID הרגיל אם הוא תקין למבנה של מונגו
    if (id && id.length === 24) {
      updatedFlight = await Flight.findByIdAndUpdate(id, normalizedData, { new: true });
    }

    // 2. אם ה-ID לא נמצא או לא תקין, ננסה לעדכן לפי התאמה של היעד והחברה הקודמים
    if (!updatedFlight) {
      updatedFlight = await Flight.findOneAndUpdate(
        { $or: [{ destination: normalizedData.destination }, { to: normalizedData.destination }] },
        normalizedData,
        { new: true }
      );
    }

    // 3. גיבוי מוחלט: אם עדיין לא נמצאה טיסה לעדכון, ניצור אותה כטיסה חדשה כדי שהמשתמש לא יתקע
    if (!updatedFlight) {
      updatedFlight = await Flight.create(normalizedData);
    }

    return NextResponse.json(updatedFlight, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

