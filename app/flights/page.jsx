"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // ודאי שהקובץ נמצא בתיקיית components

export default function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/flights')
      .then((res) => res.json())
      .then((data) => {
        setFlights(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h1>טוען טיסות...</h1>;

  return (
    <div id="box" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div id="Main" style={{ padding: '20px', flex: 1 }}>
        <h1 className="title">רשימת הטיסות שלנו</h1>
        
        <div className="the-flights" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          {flights.slice(0, 16).map((flight) => (
            <Link 
              key={flight._id} 
              href={`/flight/${flight._id}`} 
              className="flight" 
              style={{ 
                border: '1px solid #ccc', 
                padding: '20px', 
                borderRadius: '10px', 
                width: '300px',
                display: 'block',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <div className="text">
                <h1 className="where">{flight.to}</h1>
                <p className="Airline">חברת תעופה: {flight.Airline}</p>
                <p className="time">שעות: {flight.time}</p>
                <p className="price" style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                  {flight.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer /> 
    </div>
  );
}