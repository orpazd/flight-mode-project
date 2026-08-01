"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

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

  // סטייט עבור קוד קופון
  const [couponInput, setCouponInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // 0 או 0.1 (10%)
  const [couponMessage, setCouponMessage] = useState('');

  // קוד הקופון המוגדר
  const VALID_COUPON = 'ORPAZ77';

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const priceAsNumber = Number(item.price.replace(/[^0-9.-]+/g, ""));
      return sum + priceAsNumber;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const totalWithDiscount = subtotal * (1 - appliedDiscount);
    return totalWithDiscount.toFixed(2);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim().toUpperCase() === VALID_COUPON) {
      setAppliedDiscount(0.1); // 10% הנחה
      setCouponMessage('🎉 Coupon applied successfully! 10% discount added.');
    } else {
      setAppliedDiscount(0);
      setCouponMessage('❌ Invalid coupon code.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingBookings = JSON.parse(localStorage.getItem('myBookings')) || [];
    const newBooking = {
      items: cartItems,
      totalPaid: calculateTotal(),
      discountApplied: appliedDiscount > 0 ? '10%' : 'None',
      date: new Date().toLocaleDateString(),
      id: Date.now()
    };
    
    localStorage.setItem('myBookings', JSON.stringify([...existingBookings, newBooking]));
    localStorage.removeItem('cart');
    setIsSubmitted(true);
    window.dispatchEvent(new Event('storage'));
  };

  if (isSubmitted) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif', direction: 'ltr', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, background: '#fff', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', maxWidth: '500px', margin: '0 auto', color: '#333' }}>
          <h1 style={{ color: '#27ae60', fontSize: '32px' }}>🎉 Order Confirmed!</h1>
          <p style={{ fontSize: '18px', margin: '20px 0', color: '#555' }}>
            Thank you, <strong>{formData.firstName}</strong>! Your flight tickets have been sent to <strong>{formData.email}</strong>.
          </p>
          <p style={{ color: '#7f8c8d' }}>Have an amazing vacation! ✈️</p>
          <Link href="/" style={{ display: 'inline-block', marginTop: '30px', background: '#3498db', color: '#fff', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
            Back to Home Page
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div id="box" style={{ direction: 'ltr', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
                {cartItems.map((item, index) => (
                  <div key={item._id || index} style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <strong style={{ fontSize: '16px' }}>Flight to {item.to}</strong>
                        <div style={{ fontSize: '13px', color: '#7f8c8d', marginTop: '2px' }}>{item.Airline} | {item.time}</div>
                      </div>
                      <span style={{ fontWeight: 'bold', color: '#27ae60', fontSize: '16px' }}>{item.price}</span>
                    </div>

                    <div style={{ marginTop: '8px', fontSize: '12px', background: '#fff', padding: '6px 10px', borderRadius: '4px', border: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span style={{ color: '#117a65' }}>✓ Includes: Personal Backpack (Free)</span>
                      {item.luggageChoice && item.luggageChoice !== 'No extra luggage' && (
                        <span style={{ color: '#d35400', fontWeight: 'bold' }}>+ Extra Luggage: {item.luggageChoice}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* אזור הזנת קופון עם הכיתוב החדש */}
              <div style={{ margin: '20px 0', padding: '15px', background: '#fff', borderRadius: '6px', border: '1px solid #e0e0e0' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>הוסף קוד קופון</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="add coupon code" 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1, fontSize: '14px' }}
                  />
                  <button 
                    type="button" 
                    onClick={handleApplyCoupon}
                    style={{ background: '#3498db', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', color: '#fff' }}
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p style={{ fontSize: '12px', marginTop: '6px', color: appliedDiscount > 0 ? '#27ae60' : '#e74c3c', fontWeight: 'bold' }}>
                    {couponMessage}
                  </p>
                )}
              </div>

              {appliedDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#27ae60', marginBottom: '10px' }}>
                  <span>Discount (10%):</span>
                  <span>-${(calculateSubtotal() * appliedDiscount).toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '22px', fontWeight: 'bold', borderTop: '2px solid #333', paddingTop: '15px', marginTop: '10px' }}>
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

      <Footer />
    </div>
  );
}