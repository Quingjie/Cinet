'use client';

import { PropsWithChildren } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Logo from "../../logo1.jpg";
import localFont from "next/font/local";
import { useTheme } from "../theme-provider";

const anton = localFont({
  src: "../../fonts/Anton,Antonio/Anton/Anton-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-anton",
});

interface MovieSuggestion {
  id: number;
  title: string;
  poster_path: string | null;
  type: "movie" | "tv";
}

interface MovieSuggestion {
  id: number;
  title: string;
  poster_path: string | null;
  type: "movie" | "tv";
}

export const Header = (props: PropsWithChildren & { 
  onSidebarToggle?: () => void, 
  isSidebarOpen?: boolean 
}) => {
  const { data: session } = useSession();
  const { mode, theme, setMode } = useTheme();

  const getNextMode = () => {
    switch (mode) {
      case "auto":
        return "light";
      case "light":
        return "dark";
      case "dark":
        return "auto";
    }
  };

  const getModeLabel = () => {
    switch(mode) {
      case 'auto': return '🖥️ Auto';
      case 'light': return '☀️ Clair';
      case 'dark': return '🌙 Sombre';
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-4 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
      style={{
        gridArea: "header",
        width: "100%",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {props.children}

      <div className="flex items-center space-x-4">
        {isSmallScreen && session && (
          <button 
            onClick={() => props.onSidebarToggle && props.onSidebarToggle()}
            className={`mr-4 ${
              theme === "dark" 
                ? "text-white hover:bg-gray-700" 
                : "text-black hover:bg-gray-200"
            } p-2 rounded-md transition-colors`}
            aria-label={props.isSidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {props.isSidebarOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        )}
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

      <div className="flex items-center space-x-4 relative">
        {session ? (
          <>
            <input
              placeholder="Search"
              className={`p-2 border rounded w-64 ${
                theme === 'dark'
                  ? 'bg-[#2F3E52] text-white border-gray-600' 
                  : 'bg-white text-black'
              }`}
            />
            <button
              onClick={() => signOut()}
              className={`px-4 py-2 rounded-full ${
                theme === 'dark'
                  ? 'bg-[#8E8FC3] text-white dark:text-black' 
                  : 'bg-[#8E8FC3] text-white'
              }`}
            >
              Déconnexion
            </button>
            <button
              onClick={() => setMode(getNextMode())}
              className={`p-2 border rounded w-32 ${
                theme === 'dark'
                  ? 'bg-[#2F3E52] text-white border-gray-600' 
                  : 'bg-white text-black'
              }`}
            >
              {getModeLabel()}
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};