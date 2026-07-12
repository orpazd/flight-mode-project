// app/page.jsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from './components/Navbar'; // <--- 1. ייבוא הרכיב החדש
import './globals.css';

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

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== "") {
      router.push(`/flights?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const saleFlights = allItems.filter(item => item.category === "sale");
  const vacationPackages = allItems.filter(item => item.category === "vacation");
  const regularFlights = allItems.filter(item => item.category === "flights");

  return (
    <div id="box">
      
      {/* 2. במקום התפריט הישן, אנחנו משתמשים ב-Navbar החדש.
          הוספתי כאן גם את תיבת החיפוש בתוך ה-Navbar כדי שלא תאבדי אותה */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        {/* תיבת החיפוש נשארה כאן כי היא ייחודית לעמוד הבית */}
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <input
            className="Search"
            placeholder="לאן תרצו לטוס? (לחצו Enter)"
            title="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
      </div>

      {/* Header Photos */}
      <div id="HEADER">
        <div className="Photos">
          <img src="/image/שורת תצוגה/paris2.jpg" className="Photo" alt="Paris" />
          <img src="/image/שורת תצוגה/rome.jpg" className="Photo" alt="Rome" />
          <img src="/image/שורת תצוגה/new york.jpg" className="Photo" alt="New York" />
          <img src="/image/שורת תצוגה/london.jpeg" className="Photo" alt="London" />
          <img src="/image/שורת תצוגה/australia.jpg" className="Photo" alt="Australia" />
        </div>
      </div>

      {/* Main Content */}
      <div id="Main">
        <div className="title">מבצעי דקה 90</div>
        <div className="the-flights">
          {saleFlights.map((flight) => (
            <Link href={`/flight/${flight.id}`} className="flight" key={flight.id}>
              <div className="text">
                <h1 className="where">{flight.to}</h1>
                <p className="Airline">חברת תעופה: {flight.Airline}</p>
                <p className="time">שעות: {flight.time}</p>
                <p className="price" style={{ color: '#e74c3c' }}>{flight.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="title">חבילות נופש חמות</div>
        <div className="the-flights">
          {vacationPackages.map((flight) => (
            <Link href={`/flight/${flight.id}`} className="flight" key={flight.id}>
              <div className="text">
                <h1 className="where">{flight.to}</h1>
                <p className="Airline">טיסה + מלון</p>
                <p className="time">דיל קומפלט</p>
                <p className="price">{flight.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="title">טיסות פופולריות</div>
        <div className="the-flights">
          {regularFlights.map((flight) => (
            <Link href={`/flight/${flight.id}`} className="flight" key={flight.id}>
              <div className="text">
                <h1 className="where">{flight.to}</h1>
                <p className="Airline">חברת תעופה: {flight.Airline}</p>
                <p className="time">שעות: {flight.time}</p>
                <p className="price">{flight.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div id="FOOTER">
        <div className="rights">כל הזכויות שמורות - אורפז דוד © 2024</div>
      </div>
    </div>
  );
}

