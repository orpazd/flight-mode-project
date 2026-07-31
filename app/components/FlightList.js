"use client";
import React, { useState, useEffect } from 'react';

export default function FlightList() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  // שליפת הטיסות האמיתיות ממסד הנתונים דרך ה-API
  useEffect(() => {
    fetch('/api/flights')
      .then((res) => res.json())
      .then((data) => {
        setFlights(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("שגיאה בטעינת הטיסות:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>טוען טיסות...</div>;
  }

  return (
    <div className="the-flights">
      {flights.length === 0 ? (
        <p style={{ textAlign: 'center' }}>אין טיסות להצגה כרגע.</p>
      ) : (
        flights.map((flight) => (
          <a href="#" className="flight" key={flight._id || flight.id}>
            {flight.image && (
              <img src={flight.image} alt={flight.to || flight.destination} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
            )}
            <div className="text">
              <h1 className="where">{flight.to || flight.destination}</h1>
              <p className="Airline">
                חברת תעופה: {flight.Airline || flight.airline || "לא צוין"}
              </p>
              <div className="time">
                <p>זמנים / תאריכים: {flight.Dates || flight.date || flight.time || "לא צוין"}</p>
              </div>
              <p className="price">{flight.price}</p>
            </div>
          </a>
        ))
      )}
    </div>
  );
}