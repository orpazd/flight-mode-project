"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // הוספנו את useRouter לניווט

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State עבור החיפוש
  const router = useRouter();

  const updateAuthState = () => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole');
    
    setIsLoggedIn(loggedIn);
    setIsAdmin(role === 'admin');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const favs = JSON.parse(localStorage.getItem('favourites')) || [];
    setCartCount(cart.length);
    setFavCount(favs.length);
  };

  useEffect(() => {
    updateAuthState();
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
    window.dispatchEvent(new CustomEvent('auth-change'));
  };

  // פונקציה לטיפול בחיפוש
const handleSearch = (e) => {
  if (e.key === 'Enter') {
    // מנווט לעמוד הטיסות עם הכתובת הנכונה
    router.push(`/flights?search=${searchQuery}`);
  }
};

  return (
    <div className="menu">
      <Link href="/"><img src="/image/logos/logo.png" className="logo" alt="logo" /></Link>
      
      <div className="options">
        {/* שורת החיפוש החדשה */}
        <input 
          type="text" 
          placeholder="חיפוש יעד..." 
          className="button"
          style={{ marginLeft: '10px', padding: '5px' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />

        <Link href="#" className="button">מבצעי דקה 90</Link>
        <Link href="/flights" className="button">טיסות</Link>
        
        {isAdmin && <Link href="/admin" className="button" style={{ color: 'red' }}>ניהול</Link>}
        
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