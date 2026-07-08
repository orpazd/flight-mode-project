"use client";

import React from 'react';

// מערך הטיסות שלך מתוך script.js
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

export default function FlightList() {
  return (
    <div className="the-flights">
      {flights.map((flight) => (
        <a href="#" className="flight" key={flight.id}>
          <div className="text">
            <h1 className="where">{flight.to}</h1>
            <p className="Airline">חברת תעופה: {flight.Airline}</p>
            <div className="time">
              <p>הלוך: {flight.time}</p>
              <p>חזור: {flight.time2}</p>
            </div>
            <p className="price">{flight.price}</p>
          </div>
        </a>
      ))}
    </div>
  );
}