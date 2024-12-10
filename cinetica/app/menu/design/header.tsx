'use client';

import { PropsWithChildren, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Logo from "../../logo1.jpg";
import localFont from "next/font/local";

const anton = localFont({
  src: "../../fonts/Anton,Antonio/Anton/Anton-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-anton",
});

export const Header = (props: PropsWithChildren) => {
  const { data: session } = useSession();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Vérifie le mode sombre au chargement
    const checkDarkMode = () => {
      return localStorage.theme === 'dark' || 
             (!(localStorage.theme) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    };
    
    setIsDarkMode(checkDarkMode());

    // Écoute les changements de préférence système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setIsDarkMode(checkDarkMode());
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.theme = newMode ? 'dark' : 'light';
    
    // Optionnel : Ajouter un changement de classe sur l'élément racine
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <div
      className={`flex items-center justify-between p-4 ${
        isDarkMode 
          ? 'bg-gray-800 text-white' 
          : 'bg-gray-100 text-black'
      }`}
      style={{
        gridArea: "header",
        width: "100%",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {props.children}

      {/* Logo, titre et message de bienvenue */}
      <div className="flex items-center space-x-4">
        <Image
          src={Logo}
          alt="Logo"
          className="w-16 h-16 items-center rounded-full"
        />
        <h1 className={`text-2xl ${anton.className}`}>Cinetica</h1>
        {session && (
          <span className="text-sm">
            Bonjour, <strong>{session.user?.name || "Utilisateur"}</strong>
          </span>
        )}
      </div>

      {/* Barre de recherche et bouton de déconnexion */}
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <input
              placeholder="Search"
              className={`p-2 border rounded w-64 ${
                isDarkMode 
                  ? 'bg-gray-700 text-white border-gray-600' 
                  : 'bg-white text-black'
              }`}
            />
            <button
              onClick={() => signOut()}
              className={`px-4 py-2 rounded ${
                isDarkMode 
                  ? 'bg-red-700 text-white' 
                  : 'bg-red-500 text-white'
              }`}
            >
              Déconnexion
            </button>
            <button
              onClick={toggleDarkMode}
              className={`px-4 py-2 rounded ${
                isDarkMode 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-gray-200 text-black'
              }`}
            >
              {isDarkMode ? '☀️ Clair' : '🌙 Sombre'}
            </button>
          </>
        ) : (
          <>
            {/* Bouton de connexion commenté */}
          </>
        )}
      </div>
    </div>
  );
};