"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// רכיב פנימי שמטפל בסינון
function FlightsList() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search')?.toLowerCase() || '';

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

  const filteredFlights = flights.filter((flight) => {
    const destination = (flight.to || flight.destination || "").toLowerCase();
    return destination.includes(searchTerm);
  });

  if (loading) return <h1>טוען טיסות...</h1>;

  return (
    <div className="the-flights" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
      {filteredFlights.length > 0 ? (
        filteredFlights.map((flight) => (
          <Link key={flight._id} href={`/flight/${flight._id}`} className="flight" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', width: '300px' }}>
            <h1 className="where">{flight.to || flight.destination || "יעד לא צוין"}</h1>
            <p>חברת תעופה: {flight.Airline || flight.airline || "לא צוין"}</p>
            <p>תאריך: {flight.Dates || flight.date || "לא צוין"}</p>
            <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>{flight.price || "צור קשר"}</p>
          </Link>
        ))
      ) : (
        <p>לא נמצאו טיסות תואמות לחיפוש "{searchTerm}"</p>
      )}
    </div>
  );
}

// הדף הראשי שמשתמש ב-Suspense
export default function FlightsPage() {
  return (
    <div id="box" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div id="Main" style={{ padding: '20px', flex: 1 }}>
        <h1 className="title">רשימת הטיסות שלנו</h1>
        <Suspense fallback={<div>טוען...</div>}>
          <FlightsList />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}