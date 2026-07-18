"use client";
import { useState } from 'react';
import Navbar from '../components/Navbar'; // ייבוא התפריט (וודאי שהנתיב נכון)

export default function AdminPage() {
  const [formData, setFormData] = useState({
    destination: '',
    price: '',
    date: '',
    airline: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = { ...formData };

    try {
      const res = await fetch('/api/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        to: destination, // השם של המשתנה שמחזיק את היעד
        Airline: airline,  // ודאי שזה תואם לשדה ה-Airline
        Dates: date,
        time: time,
        price: price
        }),   
   });

      const data = await res.json();

      if (!res.ok) {
        alert("שגיאה מהשרת: " + JSON.stringify(data.error || data));
        return;
      }

      alert("הטיסה נוספה בהצלחה!");
      setFormData({ destination: '', price: '', date: '', airline: '' });
    } catch (err) {
      alert("שגיאת רשת, נא לבדוק את השרת");
    }
  };

  return (
    <>
      <Navbar /> {/* הוספנו את התפריט כאן */}
      
      <div style={{ padding: '40px', maxWidth: '500px', margin: 'auto' }}>
        <h1>הוספת טיסה חדשה</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            placeholder="יעד" 
            value={formData.destination} 
            onChange={(e) => setFormData({...formData, destination: e.target.value})} 
            required 
          />
          <input 
            placeholder="חברת תעופה" 
            value={formData.airline} 
            onChange={(e) => setFormData({...formData, airline: e.target.value})} 
            required 
          />
          <input 
            type="number" 
            placeholder="מחיר" 
            value={formData.price} 
            onChange={(e) => setFormData({...formData, price: e.target.value})} 
            required 
          />
          <input 
            type="date" 
            value={formData.date} 
            onChange={(e) => setFormData({...formData, date: e.target.value})} 
            required 
          />
          <button type="submit" style={{ padding: '10px', background: '#27ae60', color: 'white', border: 'none', cursor: 'pointer' }}>
            הוסף טיסה
          </button>
          <button type="button" onClick={() => setFormData({ destination: '', price: '', date: '', airline: '' })} style={{ padding: '10px', background: '#ae2727', color: 'white', border: 'none', cursor: 'pointer' }}>
            ביטול
          </button>
        </form>
      </div>
    </>
  );
}