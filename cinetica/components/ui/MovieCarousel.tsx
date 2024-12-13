//components/ui/MovieCarousel.tsx
import React from "react";
import { Movie } from '@/app/entities/movie';

interface MovieCarouselProps {
  movies: Movie[];
  pageMode: "primary" | "secondary"; // Modes définis pour les styles
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies, pageMode }) => {
  // Styles conditionnels en fonction du mode
  const cardStyle =
    pageMode === "primary"
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : "bg-green-500 text-white hover:bg-green-600";

  return (
    <div className="p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        {pageMode === "primary" ? "Primary Mode" : "Secondary Mode"}
      </h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`flex flex-col items-center text-center rounded-lg p-4 shadow ${cardStyle}`}
          >
          {movie.poster_path && ( // Ajoutez une vérification pour poster_path
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="rounded-lg"
            />
          )}
            <p className="text-sm font-medium mt-2">{movie.title}</p>
            <p className="text-xs">{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
