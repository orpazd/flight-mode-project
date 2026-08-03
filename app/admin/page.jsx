"use client";
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function AdminPage() {
  // סטייט ראשי לטופס – מאפס את כל השדות לערכים ריקים או ברירת מחדל
  const [formData, setFormData] = useState({
    destination: '',
    price: '',
    departureDate: '',
    departureTime: '',
    returnDate: '',
    returnTime: '',
    airline: '',
    image: '',
    category: 'flights'
  });

  const [flights, setFlights] = useState([]);
  const [editingId, setEditingId] = useState(null); // שומר את ה-ID של הטיסה הנוכחית בעריכה (אם אין, אז null)
  const [loading, setLoading] = useState(false); // טעינה בזמן שליחת הטופס
  const [imagePreview, setImagePreview] = useState(''); // תצוגה מקדימה לתמונה שנבחרה

  // טעינת הטיסות ברגע שהקומפוננטה עולה
  useEffect(() => {
    fetchFlights();
  }, []);

  // שליפת כל הטיסות מה-API
  const fetchFlights = async () => {
    try {
      const res = await fetch('/api/flights');
      const data = await res.json();
      setFlights(data);
    } catch (err) {
      console.error("שגיאה בטעינת הטיסות:", err);
    }
  };

  // טיפול בהעלאת תמונה והמרתה ל-Base64 כדי להציג ולשמור בקלות
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

  // פונקציית עזר להמרת כל פורמט תאריך לפורמט YYYY-MM-DD שתומך ב-HTML date input
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    
    // אם התאריך כבר בפורמט הנכון YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;

    // ניסיון לטפל בפורמט ישראלי DD/MM/YYYY או DD.MM.YYYY
    const cleanStr = dateStr.trim();
    let parts = [];
    if (cleanStr.includes('/')) {
      parts = cleanStr.split('/');
    } else if (cleanStr.includes('.')) {
      parts = cleanStr.split('.');
    }

    if (parts.length === 3) {
      // אם החלק הראשון هو השנה (למקרה הפוך)
      if (parts[0].length === 4) {
        return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
      }
      // פורמט רגיל: יום, חודש, שנה -> שנה, חודש, יום
      const [day, month, year] = parts;
      if (year && month && day) {
        return `${year.padStart(4, '2')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    }

    return '';
  };

  // לחיצה על כפתור "ערוך" – ממלא את הטופס בנתונים של הטיסה הנבחרת
  const handleEditClick = (flight) => {
    const flightId = flight._id || flight.id;
    setEditingId(flightId);

    // חילוץ תאריך הלוך ותאריך חזור מכל שדה אפשרי במסד
    let depDateRaw = flight.departureDate || '';
    let retDateRaw = flight.returnDate || '';
    const rawDate = flight.date || flight.Dates || '';
    
    if ((!depDateRaw || !retDateRaw) && rawDate.includes(' - ')) {
      const parts = rawDate.split(' - ');
      depDateRaw = parts[0]?.trim() || '';
      retDateRaw = parts[1]?.trim() || '';
    } else if (!depDateRaw) {
      depDateRaw = rawDate.trim();
    }

    // המרה לפורמט ששדה ה-HTML מבין (YYYY-MM-DD)
    const depDate = formatDateForInput(depDateRaw);
    const retDate = formatDateForInput(retDateRaw);

    // שליפה נכונה של שעות
    let depTime = flight.departureTime || '';
    let retTime = flight.returnTime || '';
    const rawTime = flight.time || '';

    if ((!depTime || !retTime) && rawTime.includes(' - ')) {
      const timeParts = rawTime.split(' - ');
      depTime = timeParts[0]?.trim() || '';
      retTime = timeParts[1]?.trim() || '';
    } else if (!depTime && rawTime && rawTime !== 'לא צוין') {
      depTime = rawTime.trim();
    }

    const extractedAirline = flight.airline || flight.Airline || flight.company || flight.flightCompany || "";

    // זיהוי קטגוריה קיימת
    let flightCategory = flight.category || 'flights';
    if (flight.sale === true || flight.sale === "yes" || flight.sale === "sale") {
      flightCategory = 'sale';
    }

    setFormData({
      destination: flight.destination || flight.to || '',
      price: flight.price || '',
      departureDate: depDate,
      departureTime: depTime,
      returnDate: retDate,
      returnTime: retTime,
      airline: extractedAirline,
      image: flight.image || '',
      category: flightCategory
    });
    
    setImagePreview(flight.image || '');
    window.scrollTo({ top: 0, behavior: 'smooth' }); // גלילה חלקה למעלה לראות את הטופס
  };
  
  // איפוס הטופס ויציאה ממצב עריכה
  const handleCancel = () => {
    setFormData({ destination: '', price: '', departureDate: '', departureTime: '', returnDate: '', returnTime: '', airline: '', image: '', category: 'flights' });
    setImagePreview('');
    setEditingId(null);
  };

  // מחיקת טיסה מהמערכת לפי ID
  const handleDelete = async (flightId) => {
    if (!confirm("האם את בטוחה שברצונך למחוק טיסה זו?")) return;

    try {
      const res = await fetch(`/api/flights/${flightId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert("שגיאה במחיקה: " + (errorData.error || "לא ניתן למחוק"));
        return;
      }

      alert("הטיסה נמחקה בהצלחה!");
      fetchFlights(); // רענון הרשימה אחרי מחיקה
    } catch (err) {
      console.error("Delete error:", err);
      alert("שגיאת רשת בעת מחיקת הטיסה");
    }
  };

  // שליחת הטופס – יצירת טיסה חדשה או עדכון קיימת
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // מחבר את התאריכים למחרוזת אחת בשביל תאימות למבנה הישן בבסיס הנתונים
    const fullDateString = (formData.departureDate && formData.returnDate) 
      ? `${formData.departureDate} - ${formData.returnDate}` 
      : (formData.departureDate || formData.returnDate || "לא צוין");
    
    // בונה את האובייקט לשליחה לשרת (כולל גיבוי לשמות שדות שונים שהיו בשימוש פעם)
    const payload = {
      destination: formData.destination,
      to: formData.destination,
      price: formData.price,
      airline: formData.airline,
      Airline: formData.airline,
      departureDate: formData.departureDate,
      departureTime: formData.departureTime,
      returnDate: formData.returnDate,
      returnTime: formData.returnTime,
      date: fullDateString,
      Dates: fullDateString,
      image: formData.image,
      category: formData.category,
      sale: formData.category === 'sale'
    };

    const url = editingId ? `/api/flights/${editingId}` : '/api/flights';
    const method = editingId ? 'PUT' : 'POST';

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
      setFormData({ destination: '', price: '', departureDate: '', departureTime: '', returnDate: '', returnTime: '', airline: '', image: '', category: 'flights' });
      setImagePreview('');
      setEditingId(null);
      fetchFlights(); // רענון רשימת הטיסות
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
        
        {/* טופס הוספה/עריכה של טיסות */}
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

          {/* בחירת קטגוריה */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '14px', color: '#555', fontWeight: 'bold' }}>קטגוריית טיסה:</label>
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              style={{ padding: '10px', fontSize: '16px', background: 'white', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="flights">טיסות רגילות (Flights)</option>
              <option value="sale">דקה 90 / מבצע (Sale)</option>
            </select>
          </div>

          {/* שורת תאריך ושעת הלוך */}
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
              <label style={{ fontSize: '14px', color: '#555', fontWeight: 'bold' }}>שעת הלוך:</label>
              <input 
                type="time" 
                value={formData.departureTime} 
                onChange={(e) => setFormData({...formData, departureTime: e.target.value})} 
                style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* שורת תאריך ושעת חזור */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '14px', color: '#555', fontWeight: 'bold' }}>שעת חזור:</label>
              <input 
                type="time" 
                value={formData.returnTime} 
                onChange={(e) => setFormData({...formData, returnTime: e.target.value})} 
                style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* העלאת תמונה ותצוגה מקדימה */}
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

          {/* כפתור שמירה / עדכון */}
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

          {/* כפתור ביטול עריכה (מופיע רק כשעורכים טיסה קיימת) */}
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

        {/* רשימת הטיסות הקיימות לניהול */}
        <h2>ניהול טיסות קיימות ({flights.length})</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
          {flights.length === 0 ? (
            <p>אין טיסות במערכת כרגע.</p>
          ) : (
            flights.map((flight) => {
              const flightId = flight._id || flight.id;
              const dateToShow = flight.date || flight.Dates || 
                (flight.departureDate && flight.returnDate ? `${flight.departureDate} - ${flight.returnDate}` : (flight.departureDate || flight.returnDate));
              
              const timeToShow = (flight.departureTime && flight.returnTime) 
                ? `${flight.departureTime} - ${flight.returnTime}` 
                : (flight.departureTime || flight.returnTime);

              const isSale = flight.sale === true || flight.category === "sale" || flight.sale === "yes";

              return (
                <div 
                  key={flightId} 
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
                      <span style={{ 
                        marginRight: '10px', 
                        padding: '2px 6px', 
                        fontSize: '12px', 
                        borderRadius: '4px', 
                        background: isSale ? '#f39c12' : '#3498db', 
                        color: 'white' 
                      }}>
                        {isSale ? 'סייל / דקה 90' : 'טיסה רגילה'}
                      </span>
                      <div style={{ color: '#e74c3c', fontWeight: 'bold', marginTop: '4px' }}>
                        {flight.price} {dateToShow ? `| תאריך: ${dateToShow}` : ''}
                      </div>
                      {timeToShow && (
                        <div style={{ color: '#555', fontSize: '14px', marginTop: '2px' }}>
                          שעות: {timeToShow}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* כפתורי פעולות על הטיסה (עריכה ומחיקה) */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      type="button"
                      onClick={() => handleEditClick(flight)}
                      style={{ 
                        padding: '8px 15px', 
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
                    <button 
                      type="button"
                      onClick={() => handleDelete(flightId)}
                      style={{ 
                        padding: '8px 15px', 
                        background: '#e74c3c', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      מחק
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}