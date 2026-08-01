import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FlyMode ",
  description: "מערכת אינטרנטית לניהול והצגת טיסות",
  icons: {
    icon: "/image/logos/logo.png", // תעדכן כאן את הנתיב ללוגו שלך בתיקיית public
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className={"layer1"}>
          {children}
        </div>
      </body>
    </html>
  );
}