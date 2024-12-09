"use client";

import { ReactNode } from "react";
import localFont from "next/font/local";
import "../globals.css";

// Configuration de la police Anton
const anton = localFont({
  src: "../fonts/Anton,Antonio/Anton/Anton-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-anton",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/logo1.jpg" />
      </head>
      <body 
        className={`
          ${anton.variable} 
          bg-gray-100 
          flex 
          justify-center 
          items-center 
          min-h-screen 
          font-sans
        `}
      >
        <div className="w-full max-w-md p-4">
          <main className="mt-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}