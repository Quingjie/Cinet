"use client";
import { useEffect, useState } from "react";
import localFont from "next/font/local";
import "../globals.css"; // Assure-toi que ce fichier existe et est bien référencé

const anton = localFont({
  src: "../fonts/Anton,Antonio/Anton/Anton-Regular.ttf", // Vérifie que ce chemin est correct
  weight: "400",
  style: "normal",
  variable: "--font-anton",
});

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true); // Assure-toi que le rendu client est bien effectué
  }, []);

  if (!isHydrated) {
    return null; // Empêche les incohérences entre le rendu serveur et client
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.webp" />
      </head>
      <body className="bg-gray-100 flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-4">
          <div className="flex justify-center">
            <h1 className={`text-4xl ${anton.className}`}>Cinetica</h1>
          </div>
          <main className="mt-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
