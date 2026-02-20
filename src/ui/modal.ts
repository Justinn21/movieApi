import { fetchMovieDetail } from "../api"
import { IMG_BASE } from "../api"
import { toggleFavorite, isFavorite } from "../store"
import { renderGrid } from "./grid"
import { renderStats } from "./stats"

export async function openModal(id: number): Promise<void> {
  const modal = document.getElementById("movie-modal") as HTMLDialogElement
  const content = document.getElementById("modal-content")
  if (!modal || !content) return

  content.innerHTML = `<span class="loading loading-spinner loading-lg"></span>`
  modal.showModal()

  const movie = await fetchMovieDetail(id)

  const poster = movie.poster_path
    ? IMG_BASE + movie.poster_path
    : "https://placehold.co/300x450?text=No+image"

  const fav = isFavorite(movie.id)

  const year = movie.release_date.slice(0, 4)

  const runtime = movie.runtime
    ? Math.floor(movie.runtime / 60) + "h" + (movie.runtime % 60) + "min"
    : "Durée inconnue"

  const genres = movie.genres.map(g => g.name).join(", ")

  content.innerHTML = `
    <img src="${poster}" alt="${movie.title}" class="w-40 rounded-lg" />
    <h2 class="text-2xl font-bold mt-4">${movie.title}</h2>
    <p class="text-sm mt-2">${year} - ${runtime}</p>
    <p class="text-sm mt-1">${genres}</p>
    <p class="text-sm mt-2">${movie.overview}</p>
    <button class="btn btn-outline mt-4" id="fav-btn">
      ${fav ? "❤️ Retirer des favoris" : "🤍 Ajouter aux favoris"}
    </button>
  `

  document.getElementById("fav-btn")?.addEventListener("click", () => {
    toggleFavorite(movie.id)
    renderGrid()
    renderStats()
    openModal(movie.id)
  })
}

export function closeModal(): void {
  const modal = document.getElementById("movie-modal") as HTMLDialogElement
  modal?.close()
}