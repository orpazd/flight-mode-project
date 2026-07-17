"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from './components/Navbar';
import './globals.css';

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    // פנייה ל-API הקיים שלך ששולף מ-MongoDB
    fetch('/api/flights')
      .then((res) => res.json())
      .then((data) => {
        setFlights(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== "") {
      router.push(`/flights?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // סינון הטיסות מהדאטה שהגיע מה-DB
  const saleFlights = flights.filter(item => item.category === "sale");
  const vacationPackages = flights.filter(item => item.category === "vacation");
  const regularFlights = flights.filter(item => item.category === "flights");

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px'}}>Loading your flights...</div>;

  return (
    <div id="box">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <input
            className="Search"
            placeholder="לאן תרצו לטוס? "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
      </div>

      <div id="Main">
        <div className="title">מבצעי דקה 90</div>
        <div className="the-flights">
          {saleFlights.map((flight) => (
            <Link href={`/flight/${flight._id}`} className="flight" key={flight._id}>
              <div className="text">
                <h1 className="where">{flight.to}</h1>
                <p className="Airline">חברת תעופה: {flight.Airline}</p>
                <p className="time">שעות: {flight.time}</p>
                <p className="price" style={{ color: '#e74c3c' }}>{flight.price}</p>
              </div>
            </Link>
          ))}
        </div>


        <div className="title">טיסות פופולריות</div>
        <div className="the-flights">
          {regularFlights.map((flight) => (
            <Link href={`/flight/${flight._id}`} className="flight" key={flight._id}>
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

      <div id="FOOTER">
        <div className="rights">כל הזכויות שמורות - אורפז דוד © 2024</div>
      </div>
    </div>
  );
}