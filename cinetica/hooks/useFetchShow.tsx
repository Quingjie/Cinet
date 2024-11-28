import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/repository/movieRepository";
import { Show } from "../app/entities/show";

export const useFetchMovies = () => {
  return useQuery<Show[], Error>({
    queryKey: ["shows"],
    queryFn: fetchMovies,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2, // Nombre de tentatives en cas d'erreur
  });
};
