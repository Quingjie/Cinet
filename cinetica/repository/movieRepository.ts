import { Movie } from "../app/entities/movie";
import { users } from "./user";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = users[0].apiKey;
export const fetchMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${API_BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des films");
  }
  return response.json();
};
