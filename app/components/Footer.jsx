// app/components/Footer.jsx
"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('נרשם בהצלחה');
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  return (
    <div id="FOOTER">
      <div className="information">
        {/* Subscribe */}
        <form onSubmit={handleSubscribe} className="Subscrib">
          <div className="title2">לקבלת מבצעים שווים למייל הירשמו</div>
          <div className="Registration">
            <div className="full-name">
              <input 
                className="last-name" 
                placeholder="שם משפחה" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input 
                className="first-name" 
                placeholder="שם פרטי" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="submit">
              <button type="submit" className="send">הרשמה</button>
              <input 
                type="email"
                className="E-mail" 
                placeholder="הכנס אימייל" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        </form>

        {/* Contact */}
        <div className="contact">
          <div className="title3">!יש לכם שאלה? נשמח לעזור</div>
          <div className="Phone">
            <div className="Phone1">
              <div className="WhatsApp">052-7810701</div>
              <img src="/image/logos/WhatsApp-Photoroom.png" className="logo-whatsapp" alt="" />
            </div>
            <div className="Phone2">
              <div className="Phone-Number">09-8821601</div>
              <img src="/image/logos/Phone-Photoroom.png" className="logo-phone" alt="" />
            </div>
          </div>
          <div className="email">
            <a href="mailto:Flightmode@gmail.co.il" className="mail">Flightmode@gmail.co.il</a>
            <img src="/image/logos/mail.png" className="logo-mail" alt="" />
          </div>
          <div className="Address">משרדינו ממוקמים ברחוב מנחם בגין 7 רמת גן</div>
        </div>
      </div>

      {/* Bottom */}
      <div className="end">
        <div>
          <Link href="/terms"><button className="ends">תקנון</button></Link>
          <Link href="/about"><button className="ends">אודות</button></Link>
          <Link href="/faq"><button className="ends">שאלות תשובות</button></Link>
        </div>
        <div className="rights">כל הזכויות שמורות - אורפז דוד © 2024</div>
      </div>
    </div>
  );
}