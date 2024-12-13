//components/ui/MovieCard.tsx
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { Movie } from '@/app/entities/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div style={{ margin: '10px', width: '200px', textAlign: 'center' }}>
      {movie.poster_path && ( // Ajoutez une vérification pour poster_path
        <Image
          src={movie.poster_path}
          alt={movie.title}
          width={200}
          height={300}
          style={{ borderRadius: '8px' }}
        />
      )}
      <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{movie.title}</h3>
      <p style={{ fontSize: '12px', color: 'gray' }}>{movie.release_date}</p>
      <p style={{ fontSize: '14px', height: '50px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{movie.overview}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FaStar color="#FFD700" size={16} />
        <p style={{ marginLeft: '5px', fontWeight: 'bold' }}>{movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
};

export default MovieCard;