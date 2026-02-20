import type { TMDBResponse, MovieDetail } from "./types"

const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string
const BASE_URL = "https://api.themoviedb.org/3"

export const IMG_BASE = "https://image.tmdb.org/t/p/w500"

export async function fetchPopularMovies(page: number): Promise<TMDBResponse> {
  const url = `${BASE_URL}/movie/popular?language=fr-FR&page=${page}`
  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + TOKEN
    }
  })
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des films")
  }
  const data = await response.json() as TMDBResponse
  return data
}

export async function fetchMovieDetail(id: number): Promise<MovieDetail> {
  const url = `${BASE_URL}/movie/${id}?language=fr-FR`
  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + TOKEN
    }
  })
  if (!response.ok) {
    throw new Error("Erreur lors du chargement du film")
  }
  const data = await response.json() as MovieDetail
  return data
}