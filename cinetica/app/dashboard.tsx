'use client';

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Utilisation de `useRouter` pour Next.js 13+

interface CustomUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  apiKey?: string;
}

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Si l'utilisateur n'est pas authentifié, redirige vers /login
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Si l'utilisateur est authentifié, affiche son dashboard
  if (session) {
    const user = session.user as CustomUser; // Cast pour le type CustomUser

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
        <div className="mt-4">
          <p>
            <strong>Email:</strong> {user.email || "No email available"}
          </p>
          <p>
            <strong>API Key:</strong> {user.apiKey || "No API Key available"}
          </p>
        </div>
      </div>
    );
  }

  // Par défaut, retourne null si l'utilisateur n'est pas encore authentifié
  return null;
};

export default Dashboard;
