import client from './client';
import type {
  CreditsResponse,
  GenreListResponse,
  Movie,
  MovieDetail,
  PaginatedResponse,
} from './types';

export async function fetchTrending(
  page: number,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await client.get<PaginatedResponse<Movie>>(
    '/trending/movie/week',
    { params: { page } },
  );
  return data;
}

export async function fetchTopRated(
  page: number,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await client.get<PaginatedResponse<Movie>>(
    '/movie/top_rated',
    { params: { page } },
  );
  return data;
}

export async function fetchGenres(): Promise<GenreListResponse> {
  const { data } = await client.get<GenreListResponse>('/genre/movie/list');
  return data;
}

export async function fetchDiscover(
  genreId: number,
  page: number,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await client.get<PaginatedResponse<Movie>>(
    '/discover/movie',
    { params: { with_genres: genreId, page } },
  );
  return data;
}

export async function searchMovies(
  query: string,
  page: number,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await client.get<PaginatedResponse<Movie>>(
    '/search/movie',
    { params: { query, page } },
  );
  return data;
}

export async function fetchMovieDetail(id: number): Promise<MovieDetail> {
  const { data } = await client.get<MovieDetail>(`/movie/${id}`);
  return data;
}

export async function fetchMovieCredits(id: number): Promise<CreditsResponse> {
  const { data } = await client.get<CreditsResponse>(`/movie/${id}/credits`);
  return data;
}

export async function fetchSimilarMovies(
  id: number,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await client.get<PaginatedResponse<Movie>>(
    `/movie/${id}/similar`,
  );
  return data;
}
