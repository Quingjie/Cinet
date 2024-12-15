import { fetchMovieDetails, fetchMovieCredits } from "@/repository/movieRepository";
import Image from "next/image";

interface MoviePageProps {
  params: { id: string };
}

const formatDate = (date: string) => {
    if (!date) return "Date inconnue";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

const MoviePage = async ({ params }: MoviePageProps) => {
  const { id } = params;

  try {
    const movie = await fetchMovieDetails(id);
    const credits = await fetchMovieCredits(id);

    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null;

    // Filtrer les acteurs principaux (limiter à 5)
    const mainCast = credits.cast.slice(0, 5);

    return (
      <div className="p-6">
        {/* Section principale avec les détails du film */}
        <div className="flex items-start gap-6">
          {posterUrl && (
            <Image
              src={posterUrl}
              alt={`Affiche de ${movie.title}`}
              width={300}
              height={450}
              className="rounded-lg shadow-md"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <p className="text-gray-700">{movie.overview}</p>
            <p className="text-gray-500 mt-4">
              <strong>Date de sortie :</strong> {formatDate(movie.release_date) || "Inconnue"}
            </p>
            <p className="text-gray-500">
              <strong>Note moyenne :</strong> {movie.vote_average.toFixed(1)}
            </p>
          </div>
        </div>

        {/* Section des acteurs principaux */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Acteurs principaux</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {mainCast.map((actor: any) => (
              <div key={actor.id} className="flex flex-col items-center text-center">
                <Image
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "/placeholder.jpg" // Image par défaut si l’acteur n’a pas de photo
                  }
                  alt={`Photo de ${actor.name}`}
                  width={120}
                  height={160}
                  className="rounded-md shadow-md"
                />
                <p className="mt-2 font-semibold">{actor.name}</p>
                <p className="text-sm text-gray-500">({actor.character})</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du film :", error);
  }
};

export default MoviePage;