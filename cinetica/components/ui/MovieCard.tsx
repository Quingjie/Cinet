//components/ui/MovieCard.tsx
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { Movie } from '@/app/entities/movie'; // Vérifiez que le chemin est correct
import '@/app/globals.css'; // Pour appliquer vos styles globaux si nécessaires

interface MovieCardProps {
  movie: Movie;
  theme: 'light' | 'dark'; // Le thème peut être passé en prop ou via contexte
}

const formatDate = (date: string) => {
  if (!date) return 'Date inconnue';
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, theme }) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-lg ${
        theme === 'light' ? 'bg-white' : 'bg-gray-800'
      }`}
      style={{ width: '200px', textAlign: 'center', margin: '10px' }}
    >
      {movie.poster_path && (
        <Image
          src={movie.poster_path}
          alt={movie.title}
          width={200}
          height={300}
          className="rounded-lg w-full h-auto" // Image qui prend toute la largeur
        />
      )}
      <h3
        className="text-lg mt-4 font-bold"
        style={{
          fontFamily: "'Anton', sans-serif", // Utilisation de la police Anton
        }}
      >
        {movie.title}
      </h3>
      <p className="text-sm text-gray-500">{formatDate(movie.release_date)}</p>
      <p
        className="text-sm mt-2"
        style={{
          height: '50px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {movie.overview}
      </p>
      <div className="flex items-center justify-end mt-4">
        <FaStar color="#8E8FC3" size={16} />
        <p className="ml-2 font-semibold">{movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
};

export default MovieCard;
