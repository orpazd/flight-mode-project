"use client";
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    destination: '',
    price: '',
    departureDate: '',
    returnDate: '',
    airline: '',
    image: ''
  });

  const [flights, setFlights] = useState([]);
  const [editingId, setEditingId] = useState(null); // משתנה ששומר את ה-ID של הטיסה שנערכת
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await fetch('/api/flights');
      const data = await res.json();
      setFlights(data);
    } catch (err) {
      console.error("שגיאה בטעינת הטיסות:", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // לחיצה על כפתור ערוך ברשימה
const handleEditClick = (flight) => {
    const flightId = flight._id || flight.id;
    console.log("Editing Flight:", flight); // יודא בטרמינל איזה נתונים מגיעים מהטיסה
    setEditingId(flightId);

    let dep = '';
    let ret = '';
    const rawDate = flight.date || flight.Dates || '';
    if (rawDate.includes(' - ')) {
      const parts = rawDate.split(' - ');
      dep = parts[0] || '';
      ret = parts[1] || '';
    } else {
      dep = rawDate;
    }

    // הוספנו כאן תמיכה בכל שם אפשרי שבו חברת התעופה עשויה להיות שמורה במסד הנתונים
    const extractedAirline = flight.airline || flight.Airline || flight.company || flight.flightCompany || "";

    setFormData({
      destination: flight.destination || flight.to || '',
      price: flight.price || '',
      departureDate: dep,
      returnDate: ret,
      airline: extractedAirline, // מעדכן ישירות את השדה בטופס
      image: flight.image || ''
    });
    setImagePreview(flight.image || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCancel = () => {
    setFormData({ destination: '', price: '', departureDate: '', returnDate: '', airline: '', image: '' });
    setImagePreview('');
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullDateString = `${formData.departureDate} - ${formData.returnDate}`;
    
    const payload = {
      destination: formData.destination,
      to: formData.destination,
      price: formData.price,
      airline: formData.airline,
      Airline: formData.airline,
      date: fullDateString,
      Dates: fullDateString,
      image: formData.image
    };

    // אם יש editingId - שולחים PUT לכתובת הספציפית. אם אין - שולחים POST חדש.
    const url = editingId ? `/api/flights/${editingId}` : '/api/flights';
    const method = editingId ? 'PUT' : 'POST';

    console.log("Submitting form with method:", method, "to URL:", url);

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("שגיאה מהשרת: " + JSON.stringify(data.error || data));
        setLoading(false);
        return;
      }

      alert(editingId ? "הטיסה עודכנה בהצלחה!" : "הטיסה נוספה בהצלחה!");
      setFormData({ destination: '', price: '', departureDate: '', returnDate: '', airline: '', image: '' });
      setImagePreview('');
      setEditingId(null);
      fetchFlights();
    } catch (err) {
      alert("שגיאת רשת, נא לבדוק את השרת");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ direction: 'rtl', textAlign: 'right', minHeight: '100vh', paddingBottom: '50px' }}>
      <Navbar />
      
      <div style={{ padding: '40px', maxWidth: '600px', margin: 'auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {editingId ? 'עריכת טיסה קיימת' : 'הוספת טיסה חדשה'}
        </h1>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <input 
            placeholder="יעד" 
            value={formData.destination} 
            onChange={(e) => setFormData({...formData, destination: e.target.value})} 
            required 
            style={{ padding: '10px', fontSize: '16px' }}
          />
          
          <input 
            placeholder="חברת תעופה" 
            value={formData.airline} 
            onChange={(e) => setFormData({...formData, airline: e.target.value})} 
            required 
            style={{ padding: '10px', fontSize: '16px' }}
          />

          <input 
            type="text" 
            placeholder="מחיר (לדוגמה: 500$)" 
            value={formData.price} 
            onChange={(e) => setFormData({...formData, price: e.target.value})} 
            required 
            style={{ padding: '10px', fontSize: '16px' }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '14px', color: '#555', fontWeight: 'bold' }}>תאריך הלוך:</label>
              <input 
                type="date" 
                value={formData.departureDate} 
                onChange={(e) => setFormData({...formData, departureDate: e.target.value})} 
                required 
                style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '14px', color: '#555', fontWeight: 'bold' }}>תאריך חזור:</label>
              <input 
                type="date" 
                value={formData.returnDate} 
                onChange={(e) => setFormData({...formData, returnDate: e.target.value})} 
                required 
                style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '14px', color: '#555', fontWeight: 'bold' }}>העלאת תמונה מהמחשב:</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              style={{ padding: '8px', fontSize: '14px', background: 'white', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            {imagePreview && (
              <div style={{ marginTop: '10px' }}>
                <img src={imagePreview} alt="תצוגה מקדימה" style={{ width: '100px', height: '70px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '12px', 
              background: loading ? '#ccc' : (editingId ? '#f39c12' : '#27ae60'), 
              color: 'white', 
              border: 'none', 
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              borderRadius: '4px'
            }}
          >
            {loading ? 'שומר...' : (editingId ? 'עדכן טיסה' : 'הוסף טיסה')}
          </button>

          {editingId && (
            <button 
              type="button" 
              onClick={handleCancel} 
              style={{ padding: '10px', background: '#7f8c8d', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
            >
              ביטול עריכה
            </button>
          )}
        </form>

        <hr style={{ margin: '40px 0', borderColor: '#ddd' }} />

        <h2>ניהול טיסות קיימות ({flights.length})</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
          {flights.length === 0 ? (
            <p>אין טיסות במערכת כרגע.</p>
          ) : (
            flights.map((flight) => (
              <div 
                key={flight._id || flight.id} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '15px', 
                  border: '1px solid #ccc', 
                  borderRadius: '6px', 
                  background: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {flight.image && (
                    <img src={flight.image} alt={flight.destination} style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  )}
                  <div>
                    <strong style={{ fontSize: '18px' }}>{flight.destination || flight.to}</strong> 
                    <span style={{ color: '#555', marginRight: '10px' }}>({flight.airline || flight.Airline})</span>
                    <div style={{ color: '#e74c3c', fontWeight: 'bold', marginTop: '4px' }}>
                      {flight.price} {(flight.date || flight.Dates) ? `| ${flight.date || flight.Dates}` : ''}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleEditClick(flight)}
                  style={{ 
                    padding: '8px 20px', 
                    background: '#3498db', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  ערוך
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}