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
    <div className="the-flights" style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', 
      gap: '20px', 
      padding: '20px' 
    }}>
      {filteredFlights.length > 0 ? (
        filteredFlights.map((flight) => {
          // שליפה חכמה של השעות: תומך גם במבנה החדש (departureTime + returnTime) וגם בישן (time)
          let timeToShow = "";
          if (flight.departureTime && flight.returnTime) {
            timeToShow = `${flight.departureTime} - ${flight.returnTime}`;
          } else if (flight.departureTime) {
            timeToShow = flight.departureTime;
          } else {
            timeToShow = flight.time || flight.Times || "";
          }

          const dateToShow = flight.date || flight.Dates || 
            (flight.departureDate && flight.returnDate ? `${flight.departureDate} - ${flight.returnDate}` : "");

          return (
            <Link 
              key={flight._id || flight.id} 
              href={`/flight/${flight._id || flight.id}`} 
              className="flight-card"
              style={{ 
                display: 'flex',
                flexDirection: 'row', 
                height: '200px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                textDecoration: 'none',
                color: 'black',
                overflow: 'hidden',
                backgroundColor: 'white'
              }}
            >
              {/* צד תמונה (ימין) */}
              <div 
                style={{
                  flex: '1',
                  backgroundImage: `url(${flight.image || '/images/placeholder.jpg'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* צד טקסט (שמאל) */}
              <div style={{ flex: '1', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h1 style={{ fontSize: '1.1rem', margin: '0 0 5px 0' }}>{flight.to || flight.destination || "יעד לא צוין"}</h1>
                  <p style={{ margin: '2px 0', fontSize: '0.8rem' }}>
                    חברת תעופה: {flight.airline || flight.Airline || "לא צוין"}
                  </p>
                  <p style={{ margin: '2px 0', fontSize: '0.8rem', direction: 'ltr', textAlign: 'right' }}>
                    תאריך: {dateToShow || "לא צוין"}
                  </p>
                  <p style={{ margin: '2px 0', fontSize: '0.8rem', direction: 'ltr', textAlign: 'right' }}>
                    שעות: {timeToShow || "לא צוין"}
                  </p>
                </div>
                <p style={{ fontWeight: 'bold', fontSize: '1rem', margin: '0' }}>{flight.price || "צור קשר"}</p>
              </div>
            </Link>
          );
        })
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