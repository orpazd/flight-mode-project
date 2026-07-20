"use client";
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function AdminPage() {
  // הוספנו שדה 'image' לסטייט
  const [formData, setFormData] = useState({
    destination: '',
    price: '',
    date: '',
    airline: '',
    image: '' // שדה חדש ללינק התמונה
  });

  // state נוסף לניהול מצב טעינה
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // התחלת טעינה

    // ה-payload כעת כולל את כל השדות, כולל התמונה
    const payload = { ...formData };

    try {
      const res = await fetch('/api/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("שגיאה מהשרת: " + JSON.stringify(data.error || data));
        setLoading(false);
        return;
      }

      alert("הטיסה נוספה בהצלחה!");
      // איפוס כל השדות כולל התמונה
      setFormData({ destination: '', price: '', date: '', airline: '', image: '' });
    } catch (err) {
      alert("שגיאת רשת, נא לבדוק את השרת");
    } finally {
      setLoading(false); // סיום טעינה (בין אם הצליח ובין אם נכשל)
    }
  };

  return (
    <>
      <Navbar />
      
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
          
          {/* שדה חדש להכנסת לינק לתמונה */}
          <input 
            type="url" // סוג url כדי לוודא שזו כתובת תקינה
            placeholder="לינק לתמונה (URL)" 
            value={formData.image} 
            onChange={(e) => setFormData({...formData, image: e.target.value})} 
            // השדה לא חובה (לא שמנו required), כדי שיוצג הפלייסלדר אם אין תמונה
          />


          <button 
            type="submit" 
            disabled={loading} // השבתת הכפתור בזמן טעינה
            style={{ 
              padding: '10px', 
              background: loading ? '#ccc' : '#27ae60', // שינוי צבע בזמן טעינה
              color: 'white', 
              border: 'none', 
              cursor: loading ? 'not-allowed' : 'pointer' 
            }}
          >
            {loading ? 'מוסיף טיסה...' : 'הוסף טיסה'}
          </button>
          <button 
            type="button" 
            onClick={() => setFormData({ destination: '', price: '', date: '', airline: '', image: '' })} 
            style={{ padding: '10px', background: '#ae2727', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            ביטול
          </button>
        </form>
      </div>
    </>
  );
}