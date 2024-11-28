"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import "../globals.css";

const anton = localFont({
  src: "../fonts/Anton,Antonio/Anton/Anton-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-anton",
});

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession(); // Vérifie si l'utilisateur est connecté
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true); // Assure que le rendu client est effectué
  }, []);

  useEffect(() => {
    if (session) {
      // Redirige l'utilisateur connecté vers /menu
      router.push("/menu");
    }
  }, [session, router]);

  if (!isHydrated) {
    return null; // Empêche un flash d'écran vide ou des incohérences
  }

  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/logo1.jpg" />
      </head>
      <body className="bg-gray-100 flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-4">
          <div className="flex justify-center">
            <h1 className={`text-4xl ${anton.className}`}></h1>
          </div>
          <main className="mt-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
