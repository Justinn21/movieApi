import { getSortedMovies, toggleFavorite, isFavorite, state } from "../store";
import { IMG_BASE } from "../api";
import { openModal } from "./modal";
import { renderCompare } from "./compare";

export function renderGrid(): void {
  const grid = document.getElementById("movie-grid");
  if (!grid) return;

  const movies = getSortedMovies();

  if (movies.length === 0) {
    grid.innerHTML = "<p>Aucun film à afficher.</p>";
    return;
  }

  grid.innerHTML = "";

  for (const movie of movies) {
    const poster = movie.poster_path
      ? IMG_BASE + movie.poster_path
      : "https://placehold.co/300x450?text=No+image";

    const year = movie.release_date.slice(0, 4);

    const fav = isFavorite(movie.id);

    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow-md cursor-pointer";

    card.innerHTML = `
      <figure>
        <img src="${poster}" alt="${movie.title}" class="w-full h-64 object-cover" />
      </figure>
      <div class="card-body p-4">
        <h2 class="card-title text-sm">${movie.title}</h2>
        <p class="text-xs">${year}</p>
        <div class="flex justify-between items-center mt-2">
          <div class="badge badge-primary">${movie.vote_average.toFixed(1)} / 10</div>
          <div class="flex gap-1">
            <button class="btn btn-xs btn-ghost compare-btn" data-id="${movie.id}">📊   </button>
            <button class="btn btn-sm btn-ghost fav-btn" data-id="${movie.id}">
              ${fav ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>
    `;

    card.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.closest(".fav-btn")) return;
      if (target.closest(".compare-btn")) return;
      openModal(movie.id);
    });

    const favBtn = card.querySelector(".fav-btn");
    favBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(movie.id);
      renderGrid();
    });

    const compareBtn = card.querySelector(".compare-btn");
    compareBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      if (state.compareIds[0] === null) {
        state.compareIds[0] = movie.id;
      } else {
        state.compareIds[1] = movie.id;
        renderCompare();
      }
    });

    grid.appendChild(card);
  }
}
