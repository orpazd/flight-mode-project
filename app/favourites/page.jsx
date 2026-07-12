// app/favourites/page.jsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import '../globals.css';

export default function FavouritesPage() {
  const [favItems, setFavItems] = useState([]);

  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavItems(savedFavs);
  }, []);

  const removeFromFavs = (id) => {
    const updatedFavs = favItems.filter(item => item.id !== id);
    setFavItems(updatedFavs);
    localStorage.setItem('favourites', JSON.stringify(updatedFavs));
    window.dispatchEvent(new Event('storage'));
  };

  // פונקציה להוספה לסל
  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // בדיקה אם הפריט כבר קיים בסל כדי למנוע כפילויות
    if (!cart.find(c => c.id === item.id)) {
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage')); // מעדכן את המונה ב-Navbar
      alert("Added to cart!");
    } else {
      alert("This item is already in your cart.");
    }
  };

  return (
    <div id="box" style={{ direction: 'ltr', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', flex: 1, width: '100%', fontFamily: 'sans-serif', textAlign: 'left' }}>
        <h1 style={{ color: '#c0392b', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Your Favorites ❤️</h1>
        
        {favItems.length === 0 ? (
          <div style={{ marginTop: '40px', fontSize: '18px', color: '#7f8c8d' }}>
            <p>You haven't added any favorites yet.</p>
            <Link href="/" style={{ color: '#3498db', textDecoration: 'underline' }}>Back to Home</Link>
          </div>
        ) : (
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {favItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', color: '#333' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>Flight to {item.to}</h3>
                  <p style={{ margin: '0', color: '#7f8c8d', fontSize: '14px' }}>Airline: {item.Airline} | Price: {item.price}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {/* כפתור הוספה לסל */}
                  <button 
                    onClick={() => addToCart(item)} 
                    style={{ background: '#27ae60', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
                    Add to Cart 🛒
                  </button>
                  <button onClick={() => removeFromFavs(item.id)} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div id="FOOTER" style={{ marginTop: 'auto' }}>
        <div className="rights" style={{ textAlign: 'center', padding: '20px 0' }}>כל הזכויות שמורות - אורפז דוד © 2024</div>
      </div>
    </div>
  );
}

