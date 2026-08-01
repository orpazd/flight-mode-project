import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ flex: 1, direction: 'rtl', textAlign: 'right', padding: '40px 20px', maxWidth: '800px', margin: 'auto', lineHeight: '1.8' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '2rem', color: '#2c3e50' }}>אודות FlyMode</h1>
        
        <p style={{ marginBottom: '15px', fontSize: '1.05rem', color: '#333' }}>
          ברוכים הבאים ל־<strong>FlyMode</strong> – מערכת אינטרנטית לניהול והצגת טיסות, שפותחה במסגרת פרויקט גמר בהנדסאי תוכנה.
        </p>

        <p style={{ marginBottom: '15px', fontSize: '1.05rem', color: '#333' }}>
          מטרת המערכת هي להעניק למשתמשים חוויית חיפוש והזמנת טיסות פשוטה, מהירה ונוחה באמצעות ממשק מודרני, ידידותי ורספונסיבי. האתר מאפשר לצפות במגוון טיסות, לבצע חיפוש לפי יעד, לעיין בפרטי כל טיסה ולהשוות בין אפשרויות שונות לפני קבלת החלטה.
        </p>

        <p style={{ marginBottom: '15px', fontSize: '1.05rem', color: '#333' }}>
          אחד הפיצ'רים המרכזיים במערכת הוא עמוד &quot;מבצעי דקה 90&quot;, המציג טיסות היוצאות במהלך שבעת הימים הקרובים ומאפשר למשתמשים למצוא הצעות משתלמות להזמנה ברגע האחרון.
        </p>

        <p style={{ marginBottom: '15px', fontSize: '1.05rem', color: '#333' }}>
          בנוסף, המערכת כוללת אפשרות להוספת טיסות לרשימת המועדפים, ניהול סל קניות, בחירת שירותי כבודה כגון טרולי או מזוודה, וכן הזנת קוד קופון במעמד התשלום לקבלת הנחות בהתאם למבצעים הפעילים.
        </p>

        <p style={{ marginBottom: '15px', fontSize: '1.05rem', color: '#333' }}>
          עבור מנהל המערכת פותח ממשק ניהול מתקדם המאפשר לבצע פעולות CRUD מלאות, הכוללות הוספה, עריכה ומחיקה של טיסות, תוך שמירה על עדכניות הנתונים המוצגים למשתמשים.
        </p>

        <p style={{ marginBottom: '15px', fontSize: '1.05rem', color: '#333' }}>
          המערכת פותחה באמצעות Next.js, React, MongoDB ו־Mongoose, תוך הקפדה על ארכיטקטורת Client–Server, ביצועים גבוהים, אבטחת מידע וחוויית משתמש איכותית.
        </p>

        <p style={{ marginBottom: '15px', fontSize: '1.05rem', color: '#333' }}>
          FlyMode מדגים כיצד ניתן לשלב טכנולוגיות פיתוח מודרניות עם עקרונות הנדסת תוכנה, על מנת ליצור מערכת אמינה, נוחה להרחבה וקלה לתחזוקה, המספקת פתרון יעיל לניהול ולהצגת טיסות בסביבה אינטרנטית.
        </p>
      </div>

      <Footer />
    </div>
  );
}