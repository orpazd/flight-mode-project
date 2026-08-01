"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  // הסרת פריט מהעגלה
  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const priceAsNumber = Number(item.price.replace(/[^0-9.-]+/g, ""));
      return sum + priceAsNumber;
    }, 0);
  };

  return (
    <div id="box" style={{ direction: 'ltr', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', flex: 1, width: '100%', fontFamily: 'sans-serif', color: '#333' }}>
        <h1 style={{ textAlign: 'left', color: '#2c3e50', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Your Shopping Cart 🛒</h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'left', marginTop: '40px' }}>
            <p style={{ fontSize: '18px', color: '#7f8c8d' }}>Your cart is empty.</p>
            <Link href="/" style={{ color: '#3498db', textDecoration: 'underline' }}>Go find some flights</Link>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
              {cartItems.map((item, index) => (
                <div key={index} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#27ae60' }}>{item.price}</span>
                    <button 
                      onClick={() => removeItem(index)} 
                      style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Total:</span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>${calculateTotal()}</span>
            </div>

            <div style={{ marginTop: '30px', textAlign: 'right' }}>
              <Link href="/checkout" style={{ background: '#27ae60', color: 'white', padding: '12px 25px', borderRadius: '5px', textDecoration: 'none', fontSize: '16px', fontWeight: 'bold' }}>
                Proceed to Checkout ➡️
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}