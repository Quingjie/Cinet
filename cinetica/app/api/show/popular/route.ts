import { Show } from '../../../entities/show';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET() {

  try {

    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.apiKey) {
      return NextResponse.json(
        { error: "Non autorisé. Veuillez vous connecter." },
        { status: 401 }
      );
    }

    const userApiKey = session.user.apiKey;

    const response = await fetch('https://api.themoviedb.org/3/tv/popular', {
      headers: {
        'Authorization': `Bearer ${userApiKey}`,
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      return NextResponse.json({ error: `Error ${response.status}: ${response.statusText}` }, { status: response.status });
    }

    const data = await response.json();
    const shows: Show[] = data.results;

    return NextResponse.json(shows);
  } catch (error) {
    console.error("Erreur lors de la récupération des films:", error);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}