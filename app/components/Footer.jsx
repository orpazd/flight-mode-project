// app/components/Footer.jsx
export default function Footer() {
  return (
    <div id="FOOTER">
      <div className="information">
        {/* Subscribe */}
        <div className="Subscrib">
          <div className="title2">לקבלת מבצעים שווים למייל הירשמו</div>
          <div className="Registration">
            <div className="full-name">
              <input className="last-name" placeholder="שם משפחה" />
              <input className="first-name" placeholder="שם פרטי" />
            </div>
            <div className="submit">
              <button className="send">הרשמה</button>
              <input className="E-mail" placeholder="הכנס אימייל" />
            </div>
          </div>
        </div>

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
          <button className="ends">תקנון</button>
          <button className="ends">אודות</button>
          <button className="ends">שאלות תשובות</button>
        </div>
        <div className="rights">כל הזכויות שמורות - אורפז דוד © 2024</div>
      </div>
    </div>
  );
}