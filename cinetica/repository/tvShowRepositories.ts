import { Show } from "../app/entities/show";
import { users } from "./user";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = users[0].apiKey;
export const fetchShows = async (): Promise<Show[]> => {
  const response = await fetch(`${API_BASE_URL}/show/popular?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des films");
  }
  return response.json();
};
