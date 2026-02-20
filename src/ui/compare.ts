import { state, setCompare } from "../store"
import { fetchMovieDetail } from "../api"

export async function renderCompare(): Promise<void> {
  const modal = document.getElementById("compare-modal") as HTMLDialogElement
  const panel = document.getElementById("compare-panel")
  if (!modal || !panel) return

  const id1 = state.compareIds[0]
  const id2 = state.compareIds[1]

  if (!id1 || !id2) return

  panel.innerHTML = `<span class="loading loading-spinner"></span>`
  modal.showModal()

  const movie1 = await fetchMovieDetail(id1)
  const movie2 = await fetchMovieDetail(id2)

  panel.innerHTML = `
    <h2 class="text-xl font-bold text-center mb-4">Comparaison</h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h3 class="card-title">${movie1.title}</h3>
          <p>Note : ${movie1.vote_average.toFixed(1)} / 10</p>
          <p>Année : ${movie1.release_date.slice(0, 4)}</p>
          <p>Durée : ${movie1.runtime} min</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h3 class="card-title">${movie2.title}</h3>
          <p>Note : ${movie2.vote_average.toFixed(1)} / 10</p>
          <p>Année : ${movie2.release_date.slice(0, 4)}</p>
          <p>Durée : ${movie2.runtime} min</p>
        </div>
      </div>
    </div>
  `

  modal.addEventListener("close", () => {
    setCompare(0, null)
    setCompare(1, null)
  })
}