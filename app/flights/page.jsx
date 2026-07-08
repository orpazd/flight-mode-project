// app/flights/page.jsx
"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar'; // <--- 1. ייבוא הרכיב

const flights = [
  { id: 1, to: "רומא", Airline: "אלעל", time: "11:30 - 15:40", time2: "11:30 - 15:40", price: "249$" },
  { id: 2, to: "פריז", Airline: "אלעל", time: "10:30 - 15:40", time2: "10:30 - 15:40", price: "249$" },
  { id: 3, to: "ניו יורק", Airline: "אלעל", time: "00:30 - 15:40", time2: "00:30 - 15:40", price: "449$" },
  { id: 4, to: "לונדון", Airline: "אלעל", time: "11:30 - 15:40", time2: "11:30 - 15:40", price: "249$" },
  { id: 5, to: "אוסטרליה", Airline: "אלעל", time: "11:30 - 15:40", time2: "11:30 - 15:40", price: "849$" },
  { id: 6, to: "ברלין", Airline: "אלעל", time: "11:30 - 15:40", time2: "11:30 - 15:40", price: "249$" },
  { id: 7, to: "מיאמי", Airline: "אלעל", time: "11:30 - 15:40", time2: "11:30 - 15:40", price: "549$" },
  { id: 8, to: "ורשה", Airline: "אלעל", time: "11:30 - 15:40", time2: "11:30 - 15:40", price: "249$" },
  { id: 9, to: "אמסטרדם", Airline: "אלעל", time: "11:30 - 15:40", time2: "11:30 - 15:40", price: "249$" },
  { id: 10, to: "פראג", Airline: "אלעל", time: "11:30 - 15:40", time2: "11:30 - 15:40", price: "249$" },
  { id: 11, to: "ברצלונה", Airline: "אלעל", time: "11:30 - 15:40", time2: "11:30 - 15:40", price: "249$" },
  { id: 12, to: "מדריד", Airline: "אלעל", time: "11:30 - 15:40", time2: "11:30 - 15:40", price: "249$" }
];

function FlightsContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const filteredFlights = flights.filter(flight => 
    flight.to.includes(searchTerm)
  );

  return (
    <div id="box">
      {/* 2. שימוש ב-Navbar במקום ה-div הישן */}
      <Navbar />

      {/* Header Photos */}
      <div id="HEADER">
        <div className="Photos">
          <img src="/image/שורת תצוגה/paris2.jpg" className="Photo" alt="Paris" />
          <img src="/image/שורת תצוגה/rome.jpg" className="Photo" alt="Rome" />
          <img src="/image/שורת תצוגה/new york.jpg.crdownload" className="Photo" alt="New York" />
          <img src="/image/שורת תצוגה/london.jpeg" className="Photo" alt="London" />
          <img src="/image/שורת תצוגה/australia.jpg" className="Photo" alt="Australia" />
        </div>
      </div>

      {/* Main Content */}
      <div id="main">
        <div className="the-flights">
          {filteredFlights.length > 0 ? (
            filteredFlights.map((flight) => (
              <Link href={`/flight/${flight.id}`} className="flight" key={flight.id}>
                <div className="text">
                  <h1 className="where">{flight.to}</h1>
                  <p className="Airline">חברת תעופה: {flight.Airline}</p>
                  <div className="time">
                    <p>הלוך: {flight.time}</p>
                    <p>חזור: {flight.time2}</p>
                  </div>
                  <p className="price">{flight.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', fontSize: '20px', color: '#666' }}>
              מצטערים, לא מצאנו טיסות ליעד "{searchTerm}"
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div id="FOOTER">
         <div className="rights">כל הזכויות שמורות - אורפז דוד © 2024</div>
      </div>
    </div>
  );
}

export default function Flights() {
  return (
    <Suspense fallback={<div>טוען...</div>}>
      <FlightsContent />
    </Suspense>
  );
}