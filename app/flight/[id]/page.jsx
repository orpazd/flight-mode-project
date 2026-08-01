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
  
  // שימוש ב-state של בוליאנים עבור כל סוג כבודה
  const [hasTrolley, setHasTrolley] = useState(false);
  const [hasBaggage, setHasBaggage] = useState(false);

  // עלויות נוספות לכבודה
  const TROLLEY_PRICE = 30; // מחיר טרולי 10 קילו
  const BAGGAGE_PRICE = 60; // מחיר מזוודה 23 קילו

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

  // חישוב מחיר בסיס ותוספות לפי מה שנבחר
  const numericPrice = parseFloat(flight.price.replace(/[^0-9.]/g, '')) || 0;
  let luggageExtraCost = 0;
  let selectedLuggageList = [];

  if (hasTrolley) {
    luggageExtraCost += TROLLEY_PRICE;
    selectedLuggageList.push('Trolley 10 kg');
  }
  if (hasBaggage) {
    luggageExtraCost += BAGGAGE_PRICE;
    selectedLuggageList.push('Baggage 23 kg');
  }

  const luggageDescription = selectedLuggageList.length > 0 ? selectedLuggageList.join(', ') : 'No extra luggage';
  const finalPrice = numericPrice + luggageExtraCost;
  const currencySymbol = flight.price.includes('$') ? '$' : '';

  // פונקציה להוספה לעגלה
  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const flightWithExtras = {
      ...flight,
      luggageChoice: luggageDescription,
      finalPrice: `${finalPrice}${currencySymbol}`,
      price: `${finalPrice}${currencySymbol}`
    };

    existingCart.push(flightWithExtras);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert(`Flight to ${flight.to} added to cart! (${luggageDescription})`);
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

  const flightImage = flight.image || flight.img;

  return (
    <div id="box" style={{ direction: 'ltr', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '40px auto', flex: 1, width: '100%' }}>
        <div style={{ 
          background: '#fff', 
          borderRadius: '10px', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)', 
          display: 'flex', 
          flexDirection: 'row', 
          overflow: 'hidden',
          alignItems: 'stretch'
        }}>
          
          {/* צד אחד: תמונה */}
          {flightImage && (
            <div style={{ flex: '1', minHeight: '300px' }}>
              <img 
                src={flightImage} 
                alt={flight.to} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          )}

          {/* צד שני: פרטי הטיסה */}
          <div style={{ flex: '1', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ marginTop: 0, fontSize: '28px' }}>{flight.to}</h1>
              <p className="Airline"><strong>חברת תעופה:</strong> {flight.Airline}</p>
              <p className="Airline"><strong>תאריכים:</strong> {flight.Dates || flight.date}</p>
              <p className="time"><strong>שעות:</strong> {flight.time}</p>
              
              {/* הודעה על תיק גב כלול */}
              <div style={{ margin: '10px 0', padding: '8px 12px', background: '#e8f8f5', borderRadius: '5px', border: '1px solid #a3e4d7', color: '#117a65', fontSize: '13px', fontWeight: 'bold' }}>
                🎒 Ticket includes a personal backpack for free!
              </div>

              {/* בחירת שירותי כבודה נוספים (באמצעות Checkboxes) */}
              <div style={{ margin: '15px 0', padding: '12px', background: '#f8f9fa', borderRadius: '5px', border: '1px solid #e9ecef' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>Select Extra Luggage (You can choose both):</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                    <input 
                      type="checkbox" 
                      checked={hasTrolley} 
                      onChange={(e) => setHasTrolley(e.target.checked)}
                    />
                    <span>Trolley 10 kg (+${TROLLEY_PRICE})</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                    <input 
                      type="checkbox" 
                      checked={hasBaggage} 
                      onChange={(e) => setHasBaggage(e.target.checked)}
                    />
                    <span>Baggage 23 kg (+${BAGGAGE_PRICE})</span>
                  </label>
                </div>
              </div>

              <p className="price" style={{ fontSize: '24px', fontWeight: 'bold', color: '#e74c3c', marginTop: '10px' }}>
                Total: {finalPrice}{currencySymbol}
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              {/* כפתור עגלה */}
              <button onClick={addToCart} style={{ background: '#3498db', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 }}>
                Add to Cart 🛒
              </button>
              
              {/* כפתור מועדפים */}
              <button onClick={addToFavorites} style={{ background: '#e67e22', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 }}>
                Favorites ❤️
              </button>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}