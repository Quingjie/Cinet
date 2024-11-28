"use client";
import { useFetchMovies } from "@/hooks/useFetchMovies";

export const MovieList = () => {
  const { data: movies, isLoading, isError } = useFetchMovies();

  if (isLoading) return <div>Chargement des films...</div>;
  if (isError) return <div>Une erreur est survenue</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {movies?.map((movie) => (
        <div key={movie.id} className="card">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
          <p>{movie.overview}</p>
        </div>
      ))}
    </div>
  );
};
