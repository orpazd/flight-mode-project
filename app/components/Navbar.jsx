// app/components/Navbar.jsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);

  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const favs = JSON.parse(localStorage.getItem('favourites')) || [];
    setCartCount(cart.length);
    setFavCount(favs.length);
  };

  useEffect(() => {
    updateCounts();
    window.addEventListener('storage', updateCounts);
    return () => window.removeEventListener('storage', updateCounts);
  }, []);

  return (
    <div className="menu">
      <Link href="/"><img src="/image/לוגויים/logo.png" className="logo" alt="logo" /></Link>
      <div className="options">
        <Link href="#" className="button">מבצעי דקה 90</Link>
        <Link href="#" className="button">חבילות נופש</Link>
        <Link href="/flights" className="button">טיסות</Link>
        <Link href="/cart" className="basket" style={{ position: 'relative' }}>
          <img src="/fav.icon/icons8-shopping-cart-50.png" alt="cart" />
          {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
        </Link>
        <Link href="/favourites" className="favourites" style={{ position: 'relative' }}>
          <img src="/image/לוגויים/icons8-heart-50.png" alt="heart" />
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