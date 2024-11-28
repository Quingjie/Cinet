'use client'; // Pour utiliser les hooks côté client

import { PropsWithChildren } from "react";
import { useSession, signOut, signIn } from "next-auth/react";

export const Header = (props: PropsWithChildren) => {
  const { data: session } = useSession();

  return (
    <div
      className="flex items-center justify-between p-4 bg-gray-100"
      style={{ gridArea: "header" }}
    >
      {/* Enfants transmis au Header */}
      {props.children}

      {/* Section utilisateur */}
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <span className="text-sm">
              Bonjour, <strong>{session.user?.name || "Utilisateur"}</strong>
            </span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Connexion
          </button>
        )}
      </div>
    </div>
  );
};
