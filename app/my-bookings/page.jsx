// app/my-bookings/page.jsx
"use client";

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../globals.css';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('myBookings')) || [];
    setBookings(savedBookings);
  }, []);

  return (
    <div id="box">
      <Navbar />
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>My Bookings ✈️</h1>
        {bookings.length === 0 ? (
          <p>You haven't made any bookings yet.</p>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} style={{ border: '1px solid #ddd', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
              <h3>Booking Date: {booking.date}</h3>
              {booking.items.map((item, idx) => (
                <div key={idx} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                  <strong>{item.to}</strong> - {item.Airline} ({item.price})
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}