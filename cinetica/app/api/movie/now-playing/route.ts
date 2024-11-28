import { Movie } from '../../../entities/movie';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET() {

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.apiKey) {
      return NextResponse.json({ error: "Vous n'êtes pas connecté." }, { status: 401 });
    }

    const userApiKey = session.user.apiKey;

    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing', {
      headers: {
        'Authorization': `Bearer ${userApiKey}`,
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      return NextResponse.json({ error: `Error ${response.status}: ${response.statusText}` }, { status: response.status });
    }

    const data = await response.json();
    const movies: Movie[] = data.results;

    return NextResponse.json(movies);
  }
  catch (error) {
    console.error("Erreur lors de la récupération des films:", error);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}