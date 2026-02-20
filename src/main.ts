import "./style.css";
import { state } from "./store";
import { fetchPopularMovies } from "./api";
import { renderGrid } from "./ui/grid";
import { renderStats } from "./ui/stats";
import { renderSkeletons } from "./ui/skeleton";
import { closeModal } from "./ui/modal";

async function loadMovies(page: number): Promise<void> {
  renderSkeletons();

  try {
    const data = await fetchPopularMovies(page);

    state.movies = [...state.movies, ...data.results];
    state.totalPages = data.total_pages;
    state.currentPage = page;

    renderGrid();
    renderStats();

    const btn = document.getElementById("load-more");
    if (btn) {
      if (page >= state.totalPages) {
        btn.style.display = "none";
      } else {
        btn.style.display = "block";
      }
    }
  } catch {
    const grid = document.getElementById("movie-grid");
    if (grid) {
      grid.innerHTML = `
        <div class="alert alert-error col-span-full">
          <p>Erreur de chargement.</p>
          <button class="btn btn-sm" id="retry-btn">Réessayer</button>
        </div>
      `;

      document.getElementById("retry-btn")?.addEventListener("click", () => {
        loadMovies(1);
      });
    }
  }
}

document.getElementById("load-more")?.addEventListener("click", () => {
  loadMovies(state.currentPage + 1);
});

document.getElementById("sort-select")?.addEventListener("change", (e) => {
  const value = (e.target as HTMLSelectElement).value;
  const parts = value.split("-");
  state.sortKey = parts[0];
  state.sortOrder = parts[1];
  renderGrid();
});

document.getElementById("view-toggle")?.addEventListener("click", () => {
  if (state.view === "all") {
    state.view = "favorites";
  } else {
    state.view = "all";
  }
  const btn = document.getElementById("view-toggle");
  if (btn) {
    btn.textContent = state.view === "all" ? "Voir mes favoris" : "Voir tous les films";
  }
  renderGrid();
  renderStats();
});

document.getElementById("theme-toggle")?.addEventListener("click", () => {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  if (current === "dark") {
    html.setAttribute("data-theme", "light");
  } else {
    html.setAttribute("data-theme", "dark");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

document.getElementById("search-input")?.addEventListener("input", (e) => {
  const searchValue = (e.target as HTMLInputElement).value.toLowerCase();

  const grid = document.getElementById("movie-grid");
  if (!grid) return;

  const allCards = grid.querySelectorAll(".card");

  for (const card of allCards) {
    const title = card.querySelector(".card-title")?.textContent?.toLowerCase() || "";

    if (title.includes(searchValue)) {
      (card as HTMLElement).style.display = "block";
    } else {
      (card as HTMLElement).style.display = "none";
    }
  }
});

loadMovies(1);
