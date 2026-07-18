"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  // הוספת ה-useEffect הזה היא התיקון הקריטי:
  // הוא מוודא שה-Checkbox יהיה מסומן אם המשתמש כבר מנהל
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole === 'admin') {
      setIsAdmin(true);
    }
  }, []);

const handleLogin = (e) => {
  e.preventDefault();

  // 1. שמירה ב-localStorage
  localStorage.setItem('isLoggedIn', 'true'); // הוספנו את זה כדי שה-Navbar ידע שאת מחוברת
  localStorage.setItem('userRole', isAdmin ? 'admin' : 'user');
  
  // 2. השורה הכי חשובה - מעדכנת את ה-Navbar ברגע שהתחברת
  window.dispatchEvent(new CustomEvent('auth-change'));

  // 3. ניווט
  router.push('/');
};

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>התחברות</h1>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label>שם משתמש:</label><br />
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>סיסמה:</label><br />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={isAdmin} 
              onChange={(e) => setIsAdmin(e.target.checked)} 
              style={{ marginRight: '10px' }}
            />
            אני מנהל מערכת (Admin)
          </label>
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          התחבר
        </button>
      </form>
    </div>
  );
}