"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LastMinutePage() {
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

  // סינון אוטומטי: רק טיסות שמוגדרות במונגו כ-sale (או true או מחרוזת "sale")
  const lastMinuteFlights = flights.filter((flight) => 
    flight.sale === true || flight.category === "sale" || flight.sale === "yes"
  );

  if (loading) return <h1 style={{ textAlign: 'center', marginTop: '50px' }}>טוען טיסות דקה 90...</h1>;

  return (
    <div id="box" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div id="Main" style={{ padding: '20px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
        <h1 className="title" style={{ width: '100%', textAlign: 'center', marginBottom: '10px' }}>
          טיסות דקה 90 ✈️
        </h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          הדילים החמים ביותר והמבצעים הבלעדיים לסגירה ברגע האחרון!
        </p>

        <div className="the-flights" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '20px', 
          padding: '20px' 
        }}>
          {lastMinuteFlights.length > 0 ? (
            lastMinuteFlights.map((flight) => (
              <Link 
                key={flight._id} 
                href={`/flight/${flight._id}`} 
                className="flight-card"
                style={{ 
                  display: 'flex',
                  flexDirection: 'row', // סדר רגיל שבו הראשון בקוד מופיע מימין בעברית
                  height: '200px',
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: 'black',
                  overflow: 'hidden',
                  backgroundColor: 'white'
                }}
              >
                {/* צד תמונה (מופיע ראשון בקוד ולכן יהיה מימין) */}
                <div 
                  style={{
                    flex: '1',
                    backgroundImage: `url(${flight.image || '/images/placeholder.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />

                {/* צד טקסט (מופיע שני בקוד ולכן יהיה משמאל) */}
                <div style={{ flex: '1', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h2 style={{ fontSize: '1.1rem', margin: '0 0 5px 0' }}>{flight.to || flight.destination || "יעד לא צוין"}</h2>
                    <p style={{ margin: '2px 0', fontSize: '0.8rem' }}>
                      חברת תעופה: {flight.airline || flight.Airline || flight.company || "לא צוין"}
                    </p>
                    <p style={{ margin: '2px 0', fontSize: '0.8rem' }}>תאריך: {flight.Dates || flight.date || "לא צוין"}</p>
                  </div>
                  <p style={{ fontWeight: 'bold', fontSize: '1rem', margin: '0', color: '#d9534f' }}>
                    {flight.price || "צור קשר"}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p style={{ textAlign: 'center', gridColumn: 'span 3', color: '#777' }}>
              כרגע אין טיסות בסייל דקה 90, חזרו בקרוב!
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}