"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../globals.css';

export default function FlightPage() {
  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
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

  // פונקציה להוספה לעגלה
  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!existingCart.some(item => item._id === flight._id)) {
      existingCart.push(flight);
      localStorage.setItem('cart', JSON.stringify(existingCart));
      alert(`Flight to ${flight.to} added to cart!`);
    } else {
      alert("Already in your cart.");
    }
  };

  // פונקציה להוספה למועדפים
  const addToFavorites = () => {
    const existingFavs = JSON.parse(localStorage.getItem('favourites')) || [];
    if (!existingFavs.some(item => item._id === flight._id)) {
      existingFavs.push(flight);
      localStorage.setItem('favourites', JSON.stringify(existingFavs));
      alert(`Flight to ${flight.to} added to favorites!`);
    } else {
      alert("Already in your favorites.");
    }
  };

  return (
    <div id="box" style={{ direction: 'ltr', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '40px auto', flex: 1 }}>
        <div style={{ background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h1>Flight Details to {flight.to}</h1>
          <p><strong>Airline:</strong> {flight.Airline}</p>
          <p><strong>Times:</strong> {flight.time}</p>
          <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#27ae60' }}>Price: {flight.price}</p>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {/* כפתור עגלה */}
            <button onClick={addToCart} style={{ background: '#3498db', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Add to Cart 🛒
            </button>
            
            {/* כפתור מועדפים */}
            <button onClick={addToFavorites} style={{ background: '#e67e22', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Add to Favorites ❤️
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}