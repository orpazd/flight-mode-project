"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(savedFavs);
  }, []);

  const removeFavourite = (idToRemove) => {
    const updatedFavs = favourites.filter((item) => item._id !== idToRemove);
    setFavourites(updatedFavs);
    localStorage.setItem('favourites', JSON.stringify(updatedFavs));
  };

  const addToCartFromFavs = (flight) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push(flight);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert(`Flight to ${flight.to} added to cart!`);
  };

  return (
    <div id="box" style={{ direction: 'ltr', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', flex: 1, width: '100%', fontFamily: 'sans-serif', color: '#333' }}>
        <h1 style={{ textAlign: 'left', color: '#2c3e50', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Your Favorite Flights ❤️</h1>

        {favourites.length === 0 ? (
          <div style={{ textAlign: 'left', marginTop: '40px' }}>
            <p style={{ fontSize: '18px', color: '#7f8c8d' }}>Your favorites list is empty.</p>
            <Link href="/" style={{ color: '#3498db', textDecoration: 'underline' }}>Go explore flights</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {favourites.map((item, index) => (
              <div key={item._id || index} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                
                {/* צד שמאל: פרטי הטיסה והכבודה (בדיוק כמו בעגלה) */}
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>Flight to {item.to}</h3>
                  <p style={{ margin: '2px 0', fontSize: '14px', color: '#555' }}><strong>Airline:</strong> {item.Airline}</p>
                  <p style={{ margin: '2px 0', fontSize: '14px', color: '#555' }}><strong>Times:</strong> {item.time}</p>
                  
                  {/* תצוגת כבודה ותיק גב */}
                  <div style={{ marginTop: '10px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <span style={{ color: '#117a65', fontWeight: 'bold' }}>✓ Includes: Personal Backpack (Free)</span>
                    {item.luggageChoice && item.luggageChoice !== 'No extra luggage' && (
                      <span style={{ color: '#d35400', fontWeight: 'bold' }}>+ Extra Luggage: {item.luggageChoice}</span>
                    )}
                  </div>
                </div>

                {/* צד ימין: מחיר, כפתור עגלה וכפתור הסרה */}
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#27ae60' }}>{item.price}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => addToCartFromFavs(item)} 
                      style={{ background: '#3498db', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Add to Cart 🛒
                    </button>
                    <button 
                      onClick={() => removeFavourite(item._id)} 
                      style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}