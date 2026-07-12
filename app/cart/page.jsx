"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // ייבוא הפוטר החדש
import '../globals.css';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div id="box" style={{ direction: 'ltr', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <Navbar />

      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', flex: 1, width: '100%', fontFamily: 'sans-serif', textAlign: 'left' }}>
        <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Your Shopping Cart 🛒</h1>
        
        {cartItems.length === 0 ? (
          <div style={{ marginTop: '40px', fontSize: '18px', color: '#7f8c8d' }}>
            <p>Your cart is empty.</p>
            <Link href="/" style={{ color: '#3498db', textDecoration: 'underline' }}>Explore flights now</Link>
          </div>
        ) : (
          <div>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', color: '#333' }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>Flight to {item.to}</h3>
                    <p style={{ margin: '0', color: '#7f8c8d', fontSize: '14px' }}>Airline: {item.Airline} | Time: {item.time}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#27ae60' }}>{item.price}</span>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '30px', textAlign: 'right' }}>
              <Link href="/checkout" style={{ background: '#27ae60', color: 'white', padding: '12px 25px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', display: 'inline-block', boxShadow: '0 4px 10px rgba(39, 174, 96, 0.2)' }}>
                Proceed to Checkout ➔
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* הוספת הפוטר בסוף הדף */}
      <Footer />
    </div>
  );
}