import axios from 'axios';
import type { Movie } from '../types/movie';

interface FetchMoviesParams {
  query: string;
}
interface TMDBMoviesResponse {
  results: Movie[];
}

// поиск фильмов через API
export async function fetchMovies({ query }: FetchMoviesParams): Promise<TMDBMoviesResponse> {
  const url = 'https://api.themoviedb.org/3/search/movie';
  const options = {
    params: { query },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch {
    throw new Error('Failed to fetch movies');
  }
}