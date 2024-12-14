import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { Movie } from '@/app/entities/movie';
import localFont from 'next/font/local';
import '@/app/globals.css';

// Importer la police Anton
const anton = localFont({
  src: "../../app/fonts/Anton,Antonio/Anton/Anton-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-anton",
});
interface MovieCardProps {
  movie: Movie;
  theme: 'light' | 'dark';
}

const formatDate = (date: string) => {
  if (!date) return 'Date inconnue';
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, theme }) => {
  return (
    <div
      className={`rounded-lg shadow-lg ${
        theme === 'light' ? 'bg-white' : 'bg-gray-800 text-white'
      }`}
      style={{
        width: '300px',
        textAlign: 'left',
        margin: '10px'
      }}
    >
      {movie.poster_path && (
        <Image
          src={movie.poster_path}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-t-lg w-full h-auto object-cover"
        />
      )}
      <div className="p-4">
        <h3
          className={`text-xl font-bold ${anton.variable} font-anton`}
        >
          {movie.title}
        </h3>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-500">{formatDate(movie.release_date)}</p>
          <div className="flex items-center">
            <FaStar color="#8E8FC3" size={16} />
            <p className="ml-2 font-semibold">{movie.vote_average.toFixed(1)}</p>
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default MovieCard;