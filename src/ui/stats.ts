import { state, getAverageRating } from "../store"

export function renderStats(): void {
  const banner = document.getElementById("stats-banner")
  if (!banner) return

  banner.innerHTML = `
    <div class="stats shadow w-full">
      <div class="stat">
        <div class="stat-title">Films chargés</div>
        <div class="stat-value">${state.movies.length}</div>
      </div>
      <div class="stat">
        <div class="stat-title">Note moyenne</div>
        <div class="stat-value">${getAverageRating()} / 10</div>
      </div>
      <div class="stat">
        <div class="stat-title">Favoris</div>
        <div class="stat-value">${state.favorites.length}</div>
      </div>
    </div>
  `
}