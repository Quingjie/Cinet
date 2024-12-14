//components/ui/MovieCarousel.tsx
import * as React from "react";
import MovieCard from "./MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Movie } from '@/app/entities/movie';

interface MovieCarouselProps {
  movies: Movie[];
  pageMode: "primary" | "secondary";
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies, pageMode }) => {
  return (
    <Carousel 
      className="w-full max-w-7xl" 
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem 
            key={movie.id}
            className="
              basis-full 
              sm:basis-1/2 
              md:basis-1/3 
              lg:basis-1/4 
              xl:basis-1/5 
              2xl:basis-1/6 
              p-2
            "
          >
            <MovieCard
              movie={movie}
              theme={pageMode === "primary" ? "light" : "dark"}
              size="small"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default MovieCarousel;