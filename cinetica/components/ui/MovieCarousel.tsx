//components/ui/MovieCarousel.tsx
import React from "react";
import { Movie } from '@/app/entities/movie';
import MovieCard from "./MovieCard";

interface MovieCarouselProps {
  movies: Movie[];
  pageMode: "primary" | "secondary"; // Modes définis pour les styles
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies, pageMode }) => {
  // Styles conditionnels en fonction du mode
  const carouselStyle =
    pageMode === "primary"
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : "bg-green-500 text-white hover:bg-green-600";

  return (
    <div className={`p-4 rounded-lg ${carouselStyle}`}>
      <h2 className="text-xl font-bold mb-4">
        {pageMode === "primary" ? "Primary Mode" : "Secondary Mode"}
      </h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            theme={pageMode === "primary" ? "light" : "dark"}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
