'use client'; // Pour utiliser les hooks côté client

import { PropsWithChildren } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
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

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100" style={{ gridArea: "header" }}>
      {props.children}

      <div className="flex items-center space-x-4">
        {session ? (
          <>
          <div className="flex items-center space-x-4">
            <Image
              src={Logo}
              alt="Logo"
              className="w-16 h-16 items-center rounded-full"
            />
            <h1 className={`text-2xl ${anton.className}`}>Cinetica</h1>
          </div>
            <span className="text-sm">
              Bonjour, <strong>{session.user?.name || "Utilisateur"}</strong>
            </span>
              <div className="ml-auto">
                <input placeholder="Search" className="p-2 border rounded" />
              </div>
            <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white rounded">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            {/*<button onClick={() => signIn()} className="px-4 py-2 bg-blue-500 text-white rounded"> Connexion </button>*/}
          </>
        )}
      </div>
    </div>
  );
};
