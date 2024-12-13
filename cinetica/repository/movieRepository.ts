//repository/movieRepository.ts
import { Movie } from "../app/entities/movie";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import "next-auth";
import { users } from "./user";

const API_BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (): Promise<Movie[]> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Non authentifié");
  }

  const userApiKey = users[0].apiKey;
  if (!userApiKey) {
    throw new Error("Clé API manquante");
  }

  const response = await fetch(`${API_BASE_URL}/movie/popular?api_key=${userApiKey}`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des films");
  }

  return response.json();
};
