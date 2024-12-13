//app/menu/design/content.tsx
'use client';

import { PropsWithChildren, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "../theme-provider";
import MovieCarousel from "../../../components/ui/MovieCarousel"; // Chemin vers le carousel

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  vote_average: number;
  overview: string;
}

export const Content = ({ children }: PropsWithChildren) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme } = useTheme();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/movie/now-playing"); 
      
        console.log("Réponse fetch status :", res.status);
        const data = await res.json();
        if (res.ok) {
          setMovies(data);
        } else {
          console.error("Détails erreur API :", data);
          setError(data.error || "Erreur lors de la récupération des films");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
        setError("Erreur de connexion");
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchMovies();
    }
  }, [session]);


  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (session) {
    return (
      <div
        className={`
          p-6 
          ${theme === 'dark' 
            ? 'bg-gray-900 text-white' 
            : 'bg-white text-black'}
        `}
        style={{ gridArea: "content" }}
      >
        {children}

        {/* Intégration du carousel */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Now Playing</h2>
          <MovieCarousel movies={movies} pageMode={theme === "dark" ? "primary" : "secondary"} />
        </div>
      </div>
    );
  }

  return null;
};
