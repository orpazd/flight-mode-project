import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function FaqPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ flex: 1, direction: 'rtl', textAlign: 'right', padding: '40px 20px', maxWidth: '800px', margin: 'auto', lineHeight: '1.8' }}>
        <h1 style={{ marginBottom: '30px', fontSize: '2rem', color: '#2c3e50' }}>שאלות ותשובות (FAQ)</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div>
            <h3 style={{ color: '#2980b9', marginBottom: '8px', fontSize: '1.2rem' }}>כיצד ניתן לחפש טיסה?</h3>
            <p style={{ color: '#333', fontSize: '1.05rem', margin: '0' }}>
              בעמוד הראשי ניתן לבצע חיפוש לפי יעד. לאחר הזנת היעד יוצגו כל הטיסות המתאימות, כולל מידע על המחיר, תאריך הטיסה ופרטים נוספים.
            </p>
          </div>

          <div>
            <h3 style={{ color: '#2980b9', marginBottom: '8px', fontSize: '1.2rem' }}>מהו עמוד &quot;מבצעי דקה 90&quot;?</h3>
            <p style={{ color: '#333', fontSize: '1.05rem', margin: '0' }}>
              עמוד זה מציג טיסות היוצאות במהלך שבעת הימים הקרובים. מטרתו לסייע למשתמשים למצוא הצעות משתלמות להזמנה ברגע האחרון.
            </p>
          </div>

          <div>
            <h3 style={{ color: '#2980b9', marginBottom: '8px', fontSize: '1.2rem' }}>כיצד ניתן לצפות בפרטי טיסה?</h3>
            <p style={{ color: '#333', fontSize: '1.05rem', margin: '0' }}>
              לחיצה על כרטיס טיסה תעביר לעמוד פרטי הטיסה, שבו מוצג מידע מפורט הכולל את יעד הטיסה, מועדי ההמראה והנחיתה, המחיר, סוג הכבודה ותיאור הטיסה.
            </p>
          </div>

          <div>
            <h3 style={{ color: '#2980b9', marginBottom: '8px', fontSize: '1.2rem' }}>למה משמשת רשימת המועדפים?</h3>
            <p style={{ color: '#333', fontSize: '1.05rem', margin: '0' }}>
              רשימת המועדפים מאפשרת לשמור טיסות שמעניינות את המשתמש ולחזור אליהן מאוחר יותר לצורך השוואה או הזמנה.
            </p>
          </div>

          <div>
            <h3 style={{ color: '#2980b9', marginBottom: '8px', fontSize: '1.2rem' }}>מה ניתן לעשות בסל הקניות?</h3>
            <p style={{ color: '#333', fontSize: '1.05rem', margin: '0' }}>
              בסל הקניות ניתן לרכז את הטיסות שנבחרו, לעדכן את פרטי ההזמנה ולהמשיך לתהליך התשלום.
            </p>
          </div>

          <div>
            <h3 style={{ color: '#2980b9', marginBottom: '8px', fontSize: '1.2rem' }}>האם ניתן לבחור כבודה נוספת?</h3>
            <p style={{ color: '#333', fontSize: '1.05rem', margin: '0' }}>
              כן. במהלך הוספת טיסה לסל הקניות ניתן לבחור שירותי כבודה נוספים, כגון טרולי או מזוודה, בהתאם לצורכי הנסיעה.
            </p>
          </div>

          <div>
            <h3 style={{ color: '#2980b9', marginBottom: '8px', fontSize: '1.2rem' }}>כיצד משתמשים בקוד קופון?</h3>
            <p style={{ color: '#333', fontSize: '1.05rem', margin: '0' }}>
              במסך התשלום ניתן להזין קוד קופון תקף. לאחר אימות הקוד, המערכת מחשבת את ההנחה ומעדכנת את המחיר הסופי של ההזמנה.
            </p>
          </div>

          <div>
            <h3 style={{ color: '#2980b9', marginBottom: '8px', fontSize: '1.2rem' }}>האם האתר מותאם לטלפונים ניידים?</h3>
            <p style={{ color: '#333', fontSize: '1.05rem', margin: '0' }}>
              כן. FlyMode פותח כמערכת רספונסיבית ומותאם למחשבים, טאבלטים וטלפונים ניידים, כך שניתן להשתמש בו בצורה נוחה מכל מכשיר.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}