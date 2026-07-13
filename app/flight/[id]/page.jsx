// app/flight/[id]/page.jsx
"use client";

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import '../../globals.css'; 

const allItems = [
  { id: 1, to: "רומא", Airline: "אלעל", time: "11:30 - 15:40", price: "249$", category: "flights" },
  { id: 2, to: "פריז", Airline: "אלעל", time: "10:30 - 15:40", price: "199$", category: "sale" },
  { id: 3, to: "ניו יורק", Airline: "אלעל", time: "00:30 - 15:40", price: "449$", category: "flights" },
  { id: 4, to: "לונדון", Airline: "איזיג'ט", time: "11:30 - 15:40", price: "149$", category: "sale" },
  { id: 5, to: "אוסטרליה", Airline: "אלעל", time: "11:30 - 15:40", price: "849$", category: "flights" },
  { id: 6, to: "ברלין", Airline: "ריינאייר", time: "11:30 - 15:40", price: "99$", category: "sale" },
  { id: 7, to: "אמסטרדם", Airline: "אלעל", time: "11:30 - 15:40", price: "299$", category: "flights" },
  { id: 8, to: "פראג", Airline: "וויזאייר", time: "11:30 - 15:40", price: "120$", category: "vacation" },
  { id: 9, to: "ברצלונה", Airline: "אלעל", time: "11:30 - 15:40", price: "320$", category: "vacation" }
];

export default function FlightPage({ params }) {
  // פתיחת ה-params ברכיב לקוח באמצעות use
  const resolvedParams = use(params);
  const flightId = Number(resolvedParams.id);
  const flight = allItems.find(item => item.id === flightId);

  // פונקציה להוספה לסל
  const addToCart = () => {
    if (!flight) return;
    // שליפת המוצרים הקיימים בסל או יצירת מערך ריק
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // בדיקה אם הטיסה כבר קיימת בסל כדי לא להוסיף פעמיים
    const isAlreadyInCart = existingCart.some(item => item.id === flight.id);
    if (!isAlreadyInCart) {
      existingCart.push(flight);
      localStorage.setItem('cart', JSON.stringify(existingCart));
      alert(`Flight to ${flight.to} added to your cart! 🛒`);
    } else {
      alert(`Flight to ${flight.to} is already in your cart!`);
    }
  };

  // פונקציה להוספה למועדפים
  const addToFavourites = () => {
    if (!flight) return;
    // שליפת המוצרים הקיימים במועדפים או יצירת מערך ריק
    const existingFavs = JSON.parse(localStorage.getItem('favourites')) || [];
    
    const isAlreadyInFavs = existingFavs.some(item => item.id === flight.id);
    if (!isAlreadyInFavs) {
      existingFavs.push(flight);
      localStorage.setItem('favourites', JSON.stringify(existingFavs));
      alert(`Flight to ${flight.to} added to your favorites! ❤️`);
    } else {
      alert(`Flight to ${flight.to} is already in your favorites!`);
    }
  };

  if (!flight) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', direction: 'ltr' }}>
        <h2>Flight not found 🔍</h2>
        <Link href="/" style={{ color: '#3498db', textDecoration: 'underline' }}>Back to Home</Link>
      </div>
    );
  }

  return (
    <div id="box" style={{ direction: 'ltr' }}>
      
      {/* --- ה-Navbar המקורי שלך --- */}
      <div className="menu">
        <Link href="/">
          <img src="/image/logos/logo.png" className="logo" alt="logo" />
        </Link>

        <div className="options">
          <Link href="#" className="button">מבצעי דקה 90</Link>
          <Link href="#" className="button">חבילות נופש</Link>
          <Link href="/flights" className="button">טיסות</Link>
          <Link href="#" className="button">חופשה בארץ</Link>
          <Link href="#" className="button">מלונות בארץ</Link>
          <Link href="#" className="button">חופשה בחו"ל</Link>
          <Link href="#" className="button">מלונות בחו"ל</Link>

          <Link href="/cart" className="basket">
            <img src="/fav.icon/icons8-shopping-cart-50.png" alt="cart" />
          </Link>

          <Link href="/favourites" className="favourites">
            <img src="/image/logos/icons8-heart-50.png" alt="heart" />
          </Link>
        </div>
      </div>

      {/* --- תוכן פנימי של כרטיס הטיסה --- */}
      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif' }}>
        <div style={{ background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', color: '#333', textAlign: 'left' }}>
          <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '15px', color: '#2c3e50', fontSize: '28px' }}>
            Flight Details to {flight.to}
          </h1>
          
          <div style={{ marginTop: '20px', fontSize: '18px', lineHeight: '2' }}>
            <p>✈️ <strong>Airline:</strong> {flight.Airline}</p>
            <p>⏰ <strong>Flight Times:</strong> {flight.time}</p>
            <p>🏷️ <strong>Deal Type:</strong> {flight.category === 'sale' ? 'Last Minute Deal!' : flight.category === 'vacation' ? 'Vacation Package' : 'Regular Flight'}</p>
            <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#27ae60', marginTop: '15px' }}>Total Price: {flight.price}</p>
            
            {/* כפתורי פעולה */}
            <div style={{ marginTop: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link href="/checkout" style={{ background: '#27ae60', color: 'white', padding: '12px 25px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', display: 'inline-block', boxShadow: '0 4px 10px rgba(39, 174, 96, 0.2)' }}>
                Proceed to Checkout ➔
              </Link>
              
              {/* חיבור אירוע הלחיצה לפונקציית הסל */}
              <button onClick={addToCart} style={{ background: '#3498db', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <img src="/fav.icon/icons8-shopping-cart-50.png" alt="cart" style={{ width: '18px', filter: 'brightness(0) invert(1)' }} />
                Add to Cart
              </button>

              {/* חיבור אירוע הלחיצה לפונקציית המועדפים */}
              <button onClick={addToFavourites} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <img src="/image/logos/icons8-heart-50.png" alt="heart" style={{ width: '18px', filter: 'brightness(0) invert(1)' }} />
                Favorite
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- ה-Footer המקורי שלך --- */}
      <div id="FOOTER">
        <div className="information">
          {/* Subscribe */}
          <div className="Subscrib">
            <div className="title2">לקבלת מבצעים שווים למייל הירשמו</div>
            <div className="Registration">
              <div className="full-name">
                <input className="last-name" placeholder="שם משפחה" />
                <input className="first-name" placeholder="שם פרטי" />
              </div>
              <div className="submit">
                <button className="send">הרשמה</button>
                <input className="E-mail" placeholder="הכנס אימייל" />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="contact">
            <div className="title3">יש לכם שאלה? נשמח לעזור!</div>
            <div className="Phone">
              <div className="Phone1">
                <div className="WhatsApp">052-7810701</div>
                <img src="/image/logos/WhatsApp-Photoroom.png" className="logo-whatsapp" alt="WhatsApp" />
              </div>
              <div className="Phone2">
                <div className="Phone-Number">09-8821601</div>
                <img src="/image/logos/Phone-Photoroom.png" className="logo-phone" alt="Phone" />
              </div>
            </div>
            <div className="email">
              <a href="mailto:Flightmode@gmail.co.il" className="mail">Flightmode@gmail.co.il</a>
              <img src="/image/logos/mail.png" className="logo-mail" alt="Mail" />
            </div>
            <div className="Address">משרדינו ממוקמים ברחוב מנחם בגין 7 רמת גן</div>
          </div>
        </div>

        {/* Bottom */}
        <div className="end">
          <div className="options-buttons">
            <Link href="#"><button className="ends">תקנון</button></Link>
            <Link href="#"><button className="ends">אודות</button></Link>
            <Link href="#"><button className="ends">שאלות תשובות</button></Link>
          </div>
          <div className="rights">כל הזכויות שמורות - אורפז דוד © 2024</div>
        </div>
      </div>

    </div>
  );
}

