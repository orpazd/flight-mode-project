"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import './globals.css';

export default function Home() {
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
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const saleFlights = flights.filter(item => item.category === "sale");
  const regularFlights = flights.filter(item => item.category === "flights");

  // פונקציה עזר ליצירת כרטיס טיסה אחיד
  const renderFlightCard = (flight) => (
    <Link 
      key={flight._id} 
      href={`/flight/${flight._id}`} 
      className="flight"
      style={{ 
        display: 'flex',
        flexDirection: 'row-reverse',
        height: '200px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        textDecoration: 'none',
        color: 'black',
        overflow: 'hidden',
        backgroundColor: 'white',
        margin: '10px 0' // מרווח בין הכרטיסים
      }}
    >
      {/* צד תמונה (שמאל) */}
      <div 
        style={{
          flex: '1',
          backgroundImage: `url(${flight.image || '/images/placeholder.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* צד טקסט (ימין) */}
      <div style={{ flex: '1', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.1rem', margin: '0 0 5px 0' }}>{flight.to}</h1>
          <p style={{ margin: '2px 0', fontSize: '0.8rem' }}>חברת תעופה: {flight.Airline}</p>
          <p style={{ margin: '2px 0', fontSize: '0.8rem' }}>תאריכים: {flight.Dates}</p>
          <p style={{ margin: '2px 0', fontSize: '0.8rem' }}>שעות: {flight.time}</p>
        </div>
        <p style={{ fontWeight: 'bold', fontSize: '1rem', margin: '0', color: flight.category === "sale" ? '#e74c3c' : 'black' }}>
          {flight.price}
        </p>
      </div>
    </Link>
  );

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px'}}>Loading your flights...</div>;

  return (
    <div id="box">
      <Navbar />

      <div id="Main" style={{ padding: '20px' }}>
        <div className="title">מבצעי דקה 90</div>
        <div className="the-flights" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {saleFlights.map(renderFlightCard)}
        </div>

        <div className="title" style={{ marginTop: '40px' }}>טיסות פופולריות</div>
        <div className="the-flights" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {regularFlights.map(renderFlightCard)}
        </div>
      </div>

      <Footer />
    </div>
  );
}