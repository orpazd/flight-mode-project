"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import '../../globals.css';

export default function FlightPage() {
  const { id } = useParams(); // שולף את ה-ID מה-URL
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // פנייה ל-API החדש שיצרנו כדי לשלוף טיסה ספציפית
      fetch(`/api/flight/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFlight(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px'}}>Loading flight...</div>;
  if (!flight) return <div style={{textAlign: 'center', marginTop: '50px'}}>Flight not found!</div>;

  // פונקציות העזר שלך נשארות כמעט אותו דבר, רק משתמשות ב-flight מה-DB
  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!existingCart.some(item => item._id === flight._id)) {
      existingCart.push(flight);
      localStorage.setItem('cart', JSON.stringify(existingCart));
      alert(`Flight to ${flight.to} added to cart!`);
    }
  };

  return (
    <div id="box" style={{ direction: 'ltr' }}>
      {/* ה-Navbar שלך נשאר כאן... */}
      <div className="menu">
         <Link href="/"><img src="/image/logos/logo.png" className="logo" alt="logo" /></Link>
         {/* שאר התפריט... */}
      </div>

      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '40px auto' }}>
        <div style={{ background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h1>Flight Details to {flight.to}</h1>
          <p><strong>Airline:</strong> {flight.Airline}</p>
          <p><strong>Times:</strong> {flight.time}</p>
          <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#27ae60' }}>Price: {flight.price}</p>
          
          <button onClick={addToCart} style={{ background: '#3498db', color: 'white', padding: '10px', marginTop: '20px' }}>
            Add to Cart
          </button>
        </div>
      </div>
      {/* ה-Footer נשאר כפי שהיה... */}
    </div>
  );
}