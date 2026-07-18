"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const updateAuthState = () => {
    // עדכון מצב התחברות
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole');
    
    setIsLoggedIn(loggedIn);
    setIsAdmin(role === 'admin');

    // עדכון ספירות עגלה ומועדפים
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const favs = JSON.parse(localStorage.getItem('favourites')) || [];
    setCartCount(cart.length);
    setFavCount(favs.length);
  };

  useEffect(() => {
    updateAuthState();

    // האזנה לאירועים של שינוי ב-LocalStorage או התחברות
    window.addEventListener('storage', updateAuthState);
    window.addEventListener('auth-change', updateAuthState);

    return () => {
      window.removeEventListener('storage', updateAuthState);
      window.removeEventListener('auth-change', updateAuthState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole'); 
    
    // שליחת אירוע לעדכון מיידי של כל ה-Navbar
    window.dispatchEvent(new CustomEvent('auth-change'));
  };

  return (
    <div className="menu">
      <Link href="/"><img src="/image/logos/logo.png" className="logo" alt="logo" /></Link>
      <div className="options">
        <Link href="#" className="button">מבצעי דקה 90</Link>
        <Link href="/flights" className="button">טיסות</Link>
        
        {/* קישור ניהול למנהל */}
        {isAdmin && <Link href="/admin" className="button" style={{ color: 'red' }}>ניהול</Link>}
        
        {/* לוגיקה של התחברות / התנתקות / הזמנות */}
        {isLoggedIn ? (
          <>
            <Link href="/my-bookings" className="button">ההזמנות שלי</Link>
            <button onClick={handleLogout} className="button" style={{ cursor: 'pointer', background: 'none', border: 'none' }}>
              התנתק
            </button>
          </>
        ) : (
          <Link href="/login" className="button">התחברות</Link>
        )}

        {/* עגלה ומועדפים (החזרתי אותם!) */}
        <Link href="/cart" className="basket" style={{ position: 'relative' }}>
          <img src="/fav.icon/icons8-shopping-cart-50.png" alt="cart" />
          {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
        </Link>
        <Link href="/favourites" className="favourites" style={{ position: 'relative' }}>
          <img src="/image/logos/icons8-heart-50.png" alt="heart" />
          {favCount > 0 && <span style={badgeStyle}>{favCount}</span>}
        </Link>
      </div>
    </div>
  );
}

const badgeStyle = {
  position: 'absolute',
  top: '-5px',
  right: '-5px',
  background: '#e74c3c',
  color: 'white',
  borderRadius: '50%',
  width: '18px',
  height: '18px',
  fontSize: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold'
};