import type { AppState, Movie } from "./types";

export const state: AppState = {
  movies: [],
  favorites: JSON.parse(localStorage.getItem("favoris") || "[]"),
  currentPage: 1,
  totalPages: 1,
  view: "all",
  sortKey: "popularity",
  sortOrder: "desc",
  compareIds: [null, null],
};

export function toggleFavorite(id: number): void {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter((f) => f !== id);
  } else {
    state.favorites.push(id);
  }
  localStorage.setItem("favoris", JSON.stringify(state.favorites));
}

export function isFavorite(id: number): boolean {
  return state.favorites.includes(id);
}

export function getAverageRating(): string {
  if (state.movies.length === 0) return "0.0";
  let total = 0;
  for (const movie of state.movies) {
    total = total + movie.vote_average;
  }
  return (total / state.movies.length).toFixed(1);
}

export function getSortedMovies(): Movie[] {
  let list = [...state.movies];

  if (state.view === "favorites") {
    list = list.filter((m) => state.favorites.includes(m.id));
  }

  list.sort((a, b) => {
    if (state.sortKey === "title") {
      return state.sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    const valA = a[state.sortKey as keyof Movie] as number;
    const valB = b[state.sortKey as keyof Movie] as number;
    return state.sortOrder === "asc" ? valA - valB : valB - valA;
  });

  return list;
}

export function setCompare(slot: 0 | 1, id: number | null): void {
  state.compareIds[slot] = id;
}
