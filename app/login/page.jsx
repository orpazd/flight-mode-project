"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    let role = 'user';

    // 1. בדיקה האם זה מנהל המערכת הספציפי
    if (username === 'admin') {
      if (password === '123456') {
        role = 'admin';
      } else {
        setError('סיסמת מנהל שגויה!');
        return; // עוצר את הפונקציה ולא נותן להיכנס
      }
    } 
    // 2. בדיקה למשתמש רגיל (לדוגמה: דורשים סיסמה באורך מינימלי של 4 תווים)
    else {
      if (password.length < 4) {
        setError('שם משתמש או סיסמה שגויים (סיסמה חייבת להכיל לפחות 4 תווים)');
        return; // עוצר את הפונקציה ולא נותן להיכנס
      }
      role = 'user'; 
    }

    // אם הגענו לכאן - ההתחברות הצליחה!
    // 1. שמירה ב-localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', username);
    
    // 2. עדכון ה-Navbar
    window.dispatchEvent(new CustomEvent('auth-change'));

    // 3. ניווט לדף הבית
    router.push('/');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: 'white', direction: 'rtl', textAlign: 'right' }}>
      <h1 style={{ textAlign: 'center' }}>התחברות</h1>
      
      {/* הצגת הודעת שגיאה אם יש בעיה */}
      {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label>שם משתמש:</label><br />
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>סיסמה:</label><br />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          התחבר
        </button>
      </form>
    </div>
  );
}