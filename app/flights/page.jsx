"use client";

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // הבאת הנתונים מה-API שיצרנו ב-app/api/flights/route.js
    fetch('/api/flights')
      .then((res) => res.json())
      .then((data) => {
        setFlights(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching flights:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div id="box" style={{ direction: 'ltr', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '20px' }}>
        <h1>Available Flights</h1>
        
        {loading ? (
          <p>Loading your flights...</p>
        ) : (
          <div className="the-flights" style={{ display: 'grid', gap: '20px' }}>
            {flights.map((flight) => (
              <div key={flight._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                <h3>Flight to {flight.to}</h3>
                <p>Airline: {flight.airline}</p>
                <p>Price: {flight.price}</p>
                <p>Time: {flight.time}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}