'use client';

import { PropsWithChildren, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Content = ({ children }: PropsWithChildren) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirige vers /login si l'utilisateur n'est pas authentifié
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Affiche un message de chargement pendant que l'état de la session est en cours de vérification
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Affiche le contenu si l'utilisateur est authentifié
  if (session) {
    return (
      <div className="bg-white p-6" style={{ gridArea: "content" }}>
        {children}
      </div>
    );
  }

  // Optionnel : Affiche un message si l'utilisateur n'est pas authentifié
  return null;
};