//app/menu/design/content.tsx
'use client';

import { PropsWithChildren, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "../theme-provider";

import MovieCarousel from "../../../components/ui/MovieCarousel";
import ShowCarousel from "../../../components/ui/ShowCarousel";

import { Movie } from '@/app/entities/movie'; 
import { Show } from '@/app/entities/show'; 

export const Content = ({ children }: PropsWithChildren) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log("Current pathname:", pathname);

      try {
        let endpoint = "";

        if (pathname === "/menu") {
          const [moviesRes, showsRes] = await Promise.all([
            fetch("/api/movie/now-playing"),
            fetch("/api/show/on-the-air")
          ]);
          setMovies(await moviesRes.json());
          setShows(await showsRes.json());
        } else if (pathname.includes("/menu/movie")) {
          if (pathname.includes("now-playing")) endpoint = "/api/movie/now-playing";
          if (pathname.includes("popular")) endpoint = "/api/movie/popular";
          if (pathname.includes("top-rated")) endpoint = "/api/movie/top-rated";
          const moviesRes = await fetch(endpoint);
          setMovies(await moviesRes.json());
          setShows([]);
        } else if (pathname.includes("/menu/show")) {
          console.log("Entering show condition");
          if (pathname === "/menu/show/on-the-air") console.log("Fetching on-the-air shows"); endpoint = "/api/show/on-the-air";
          if (pathname === "/menu/show/popular") endpoint = "/api/show/popular";
          if (pathname === "/menu/show/top-rated") endpoint = "/api/show/top-rated";
          console.log("Selected endpoint:", endpoint);
          const showsRes = await fetch(endpoint);
          setShows(await showsRes.json());
          setMovies([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [pathname, session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
      style={{ gridArea: "content" }}
    >
      {children}

      {loading ? (
        <div>Chargement...</div>
      ) : (
        <>
          {pathname === "/menu" && (
            <>
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Now Playing</h2>
                <MovieCarousel movies={movies} pageMode={theme === "dark" ? "primary" : "secondary"} />
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">On the Air</h2>
                <ShowCarousel shows={shows} pageMode={theme === "dark" ? "primary" : "secondary"} />
              </div>
            </>
          )}

          {pathname.includes("/menu/movie") && movies.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Movies</h2>
              <MovieCarousel movies={movies} pageMode={theme === "dark" ? "primary" : "secondary"} />
            </div>
          )}

          {pathname.includes("/menu/show") && shows.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">TV Shows</h2>
              <ShowCarousel shows={shows} pageMode={theme === "dark" ? "primary" : "secondary"} />
            </div>
          )}
        </>
      )}
    </div>
  );
};