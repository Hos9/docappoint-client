import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata = {
  title: "DocAppoint — Doctor Appointment Booking",
  description:
    "Book appointments with top-rated doctors across all specialties. Fast, easy, and secure.",
  keywords: "doctor appointment, healthcare, medical booking, Dhaka doctors",
  openGraph: {
    title: "DocAppoint — Doctor Appointment Booking",
    description: "Find and book appointments with the best doctors near you.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      data-theme="dark"
      lang="en"
      suppressHydrationWarning
      className={`${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#040D1A] font-[var(--font-nunito)]">
        <Toaster
          toastOptions={{
            style: {
              background: "#0F1E33",
              color: "#e2e8f0",
              border: "1px solid rgba(56,189,248,0.2)",
              borderRadius: "12px",
              fontFamily: "var(--font-nunito)",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
