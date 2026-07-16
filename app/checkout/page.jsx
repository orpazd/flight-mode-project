// app/checkout/page.jsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar'; // ייבוא ה-Navbar החדש
import Footer from '../components/Footer'; // ייבוא הפוטר החדש

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    passport: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const priceAsNumber = Number(item.price.replace(/[^0-9.-]+/g, ""));
      return sum + priceAsNumber;
    }, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

// במקום רק למחוק, נשמור את ההזמנה בהיסטוריה
const handleSubmit = (e) => {
  e.preventDefault();
  
  // 1. קבלת הזמנות קיימות
  const existingBookings = JSON.parse(localStorage.getItem('myBookings')) || [];
  
  // 2. הוספת ההזמנה הנוכחית (עם תאריך)
  const newBooking = {
    items: cartItems,
    date: new Date().toLocaleDateString(),
    id: Date.now()
  };
  
  // 3. שמירה חזרה
  localStorage.setItem('myBookings', JSON.stringify([...existingBookings, newBooking]));
  
  // 4. ניקוי הסל
  localStorage.removeItem('cart');
  setIsSubmitted(true);
  window.dispatchEvent(new Event('storage'));
};
  if (isSubmitted) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif', direction: 'ltr' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', maxWidth: '500px', margin: '0 auto', color: '#333' }}>
          <h1 style={{ color: '#27ae60', fontSize: '32px' }}>🎉 Order Confirmed!</h1>
          <p style={{ fontSize: '18px', margin: '20px 0', color: '#555' }}>
            Thank you, <strong>{formData.firstName}</strong>! Your flight tickets have been sent to <strong>{formData.email}</strong>.
          </p>
          <p style={{ color: '#7f8c8d' }}>Have an amazing vacation! ✈️</p>
          <Link href="/" style={{ display: 'inline-block', marginTop: '30px', background: '#3498db', color: '#fff', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
            Back to Home Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="box" style={{ direction: 'ltr', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* כאן בוצע השינוי: החלפת התפריט הישן ב-Navbar */}
      <Navbar />

      <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', flex: 1, width: '100%', fontFamily: 'sans-serif', color: '#333' }}>
        <h1 style={{ textAlign: 'left', color: '#2c3e50', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Secure Checkout 🔒</h1>
        
        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'left', marginTop: '40px' }}>
            <p style={{ fontSize: '18px', color: '#7f8c8d' }}>Your cart is empty. You cannot proceed to checkout.</p>
            <Link href="/" style={{ color: '#3498db', textDecoration: 'underline' }}>Go find a flight</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', textAlign: 'left' }}>
            
            <div style={{ background: '#f9f9f9', padding: '25px', borderRadius: '8px', height: 'fit-content' }}>
              <h2 style={{ marginTop: 0, color: '#2c3e50', fontSize: '20px' }}>Order Summary</h2>
              <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
                    <div>
                      <strong style={{ fontSize: '16px' }}>Flight to {item.to}</strong>
                      <div style={{ fontSize: '13px', color: '#7f8c8d' }}>{item.Airline} | {item.time}</div>
                    </div>
                    <span style={{ fontWeight: 'bold', color: '#27ae60' }}>{item.price}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '22px', fontWeight: 'bold', borderTop: '2px solid #333', paddingTop: '15px', marginTop: '20px' }}>
                <span>Total Price:</span>
                <span style={{ color: '#27ae60' }}>${calculateTotal()}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>1. Passenger Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <input type="text" name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleInputChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                  <input type="text" name="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleInputChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>
                <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleInputChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', marginBottom: '10px', boxSizing: 'border-box' }} />
                <input type="text" name="passport" placeholder="Passport Number" required value={formData.passport} onChange={handleInputChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box' }} />
              </div>

              <div>
                <h3 style={{ margin: '20px 0 15px 0', color: '#2c3e50', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>2. Payment Information</h3>
                <input type="text" name="cardNumber" placeholder="Card Number (16 digits)" maxLength="16" required value={formData.cardNumber} onChange={handleInputChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', marginBottom: '10px', boxSizing: 'border-box' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input type="text" name="expiry" placeholder="MM/YY" maxLength="5" required value={formData.expiry} onChange={handleInputChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                  <input type="text" name="cvv" placeholder="CVV (3 digits)" maxLength="3" required value={formData.cvv} onChange={handleInputChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>
              </div>

              <button type="submit" style={{ background: '#27ae60', color: 'white', border: 'none', padding: '15px', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', transition: 'background 0.2s' }}>
                Pay & Complete Booking ✈️
              </button>
            </form>
          </div>
        )}
      </div>

      <div id="FOOTER" style={{ marginTop: 'auto' }}>
        <div className="rights" style={{ textAlign: 'center', padding: '20px 0' }}>כל הזכויות שמורות - אורפז דוד © 2024</div>
      </div>
    </div>



  );

}

