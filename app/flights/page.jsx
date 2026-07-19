"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    <div className="the-flights" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {filteredFlights.length > 0 ? (
        filteredFlights.map((flight) => (
          <div style = {{backgroundImage: 'url(' + (flight.image || '/images/placeholder.jpg') + ')', width: '300px', 
            backgroundSize: 'contain'
          }}>
            <Link key={flight._id} href={`/flight/${flight._id}`} className="flight"
              style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '10px',  textDecoration: 'none', color: 'inherit' }}>
              {/* <img
                src={flight.image || "/images/placeholder.jpg"}
                alt={flight.to}
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
              /> */}
              <h1 className="where" style={{ fontSize: '1.2rem', margin: '0 0 10px 0' }}>{flight.to || flight.destination || "יעד לא צוין"}</h1>
              <p>חברת תעופה: {flight.Airline || flight.airline || "לא צוין"}</p>
              <p>תאריך: {flight.Dates || flight.date || "לא צוין"}</p>
              <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>{flight.price || "צור קשר"}</p>
            </Link>
          </div>
        ))
      ) : (
        <p>לא נמצאו טיסות תואמות לחיפוש "{searchTerm}"</p>
      )}
    </div>
  );
}

export default function FlightsPage() {
  return (
    <div id="box" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div id="Main" style={{ padding: '20px', flex: 1, width: '100%', boxSizing: 'border-box' }}>

        <h1 className="title" style={{ width: '100%', textAlign: 'center', marginBottom: '30px' }}>
          רשימת הטיסות שלנו
        </h1>

        <Suspense fallback={<div>טוען...</div>}>
          <FlightsList />
        </Suspense>

      </div>
      <Footer />
    </div>
  );
}