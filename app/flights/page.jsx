"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import data from '../../data.json'; // כאן אנחנו מחברים את הקובץ שיצרת

function FlightsContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  // במקום רשימה ארוכה בקוד, אנחנו מושכים מהקובץ data.json
  const [flights] = useState(data.flights); 

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) setSearchTerm(query);
  }, [searchParams]);

  const filteredFlights = flights.filter(flight => 
    flight.to.includes(searchTerm)
  );

  return (
    <div id="box">
      <Navbar />
      <div id="main">
        <div className="the-flights">
          {filteredFlights.map((flight) => (
            <Link href={`/flight/${flight.id}`} className="flight" key={flight.id}>
              <div className="text">
                <h1 className="where">{flight.to}</h1>
                <p>חברת תעופה: {flight.Airline}</p>
                <p>מחיר: {flight.price}</p>
              </div>
            </Link>
          ))}
        </div>
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

