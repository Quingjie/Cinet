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
  const [shows, setShows] = useState<Movie[]>([]); // Nouvel état pour les séries
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingShows, setLoadingShows] = useState(true);
  const [errorMovies, setErrorMovies] = useState<string | null>(null);
  const [errorShows, setErrorShows] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoadingMovies(true);
        const res = await fetch("/api/movie/now-playing");
        console.log("Réponse fetch films status :", res.status);
        const data = await res.json();
        if (res.ok) {
          setMovies(data);
        } else {
          console.error("Détails erreur API films :", data);
          setErrorMovies(data.error || "Erreur lors de la récupération des films");
        }
      } catch (error) {
        console.error("Erreur réseau films :", error);
        setErrorMovies("Erreur de connexion pour les films");
      } finally {
        setLoadingMovies(false);
      }
    };

    const fetchShows = async () => {
      try {
        setLoadingShows(true);
        const res = await fetch("/api/show/on-the-air");
        console.log("Réponse fetch séries status :", res.status);
        const data = await res.json();
        if (res.ok) {
          setShows(data);
        } else {
          console.error("Détails erreur API séries :", data);
          setErrorShows(data.error || "Erreur lors de la récupération des séries");
        }
      } catch (error) {
        console.error("Erreur réseau séries :", error);
        setErrorShows("Erreur de connexion pour les séries");
      } finally {
        setLoadingShows(false);
      }
    };

    if (session) {
      fetchMovies();
      fetchShows();
    }
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (errorMovies || errorShows) {
    return (
      <div>
        {errorMovies && <div>Erreur films : {errorMovies}</div>}
        {errorShows && <div>Erreur séries : {errorShows}</div>}
      </div>
    );
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

        {/* Intégration du carousel pour les films */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Now Playing</h2>
          {loadingMovies ? (
            <div>Chargement des films...</div>
          ) : (
            <MovieCarousel movies={movies} pageMode={theme === "dark" ? "primary" : "secondary"} />
          )}
        </div>

        {/* Intégration du carousel pour les séries */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">On the Air</h2>
          {loadingShows ? (
            <div>Chargement des séries...</div>
          ) : (
            <MovieCarousel movies={shows} pageMode={theme === "dark" ? "primary" : "secondary"} />
          )}
        </div>
      </div>
    );
  }

  return null;
};
