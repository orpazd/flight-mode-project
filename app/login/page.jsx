"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // מצב: האם אנחנו בהתחברות או ברישום?
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // לוגיקת התחברות
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        alert("התחברת בהצלחה!");
        router.push('/');
      } else {
        alert("משתמש לא קיים או סיסמה שגויה");
      }
    } else {
      // לוגיקת רישום
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.find(u => u.email === formData.email)) {
        alert("האימייל הזה כבר רשום במערכת!");
      } else {
        users.push(formData);
        localStorage.setItem('users', JSON.stringify(users));
        alert("נרשמת בהצלחה! כעת ניתן להתחבר.");
        setIsLogin(true);
      }
    }
  };

  return (
    <div id="box">
      <Navbar />
      <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>{isLogin ? "התחברות" : "רישום משתמש חדש"}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="email" placeholder="אימייל" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="סיסמה" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <button type="submit">{isLogin ? "התחבר" : "הירשם"}</button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center', cursor: 'pointer', color: 'blue' }} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "אין לך חשבון? הירשם עכשיו" : "כבר יש לך חשבון? התחבר כאן"}
        </p>
      </div>
    </div>
  );
}