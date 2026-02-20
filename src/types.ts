export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  vote_average: number
  popularity: number
}

export interface MovieDetail {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  vote_average: number
  popularity: number
  runtime: number | null
  genres: { id: number; name: string }[]
  tagline: string
}

export interface TMDBResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface AppState {
  movies: Movie[]
  favorites: number[]
  currentPage: number
  totalPages: number
  view: string
  sortKey: string
  sortOrder: string
  compareIds: [number | null, number | null]
}