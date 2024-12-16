import { fetchMovieDetails, fetchMovieCredits } from "@/repository/movieRepository";
import Image from "next/image";
import localFont from "next/font/local";

const anton = localFont({
  src: "../../../../app/fonts/Anton,Antonio/Anton/Anton-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-anton",
});

interface moviePageProps {
  params: { id: string };
}

const formatDate = (date: string) => {
  if (!date) return "Date inconnue";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

const moviePage = async ({ params }: moviePageProps) => {
  const { id } = params;

  try {
    const movie = await fetchMovieDetails(id);
    const credits = await fetchMovieCredits(id);

    console.log("movie Details:", movie);
    console.log("Credits:", credits);

    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null;

    const mainCast = credits.cast ? credits.cast.slice(0, 5) : [];

    const director = credits.crew?.find((member: any) => member.job === "Director")?.name || "Non spécifié";
    const composer = credits.crew?.find((member: any) => member.job === "Original Music Composer")?.name || "Non spécifié";

    return (
      <div className="p-6">
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
            <h1 className={`text-3xl font-bold mb-4 ${anton.className}`}>{movie.title || movie.title}</h1>
            <p className="text-[#8E8FC3]">{movie.overview}</p>
            <p className="text-gray-500 mt-4">
              <strong>Date de première diffusion :</strong> <a className="text-[#8E8FC3]">{formatDate(movie.release_date)}</a>
            </p>
            <p className="text-gray-500">
              <strong>Note moyenne :</strong> <a className="text-[#8E8FC3]">{movie.vote_average?.toFixed(1) || "Non noté"} </a>
            </p>
            <p className="text-gray-500">
              <strong>Réalisateur :</strong> <a className="text-[#8E8FC3]">{director}</a>
            </p>
            <p className="text-gray-500">
              <strong>Compositeur :</strong> <a className="text-[#8E8FC3]">{composer}</a>
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Acteurs principaux</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {mainCast.map((actor: { id: number; profile_path: string | null; name: string; character: string }) => (
              <div key={actor.id} className="flex flex-col items-center text-center">
                <Image
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "/placeholder.jpg"
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
    console.error("Erreur lors de la récupération des détails de la série :", error);
  }
};

export default moviePage;