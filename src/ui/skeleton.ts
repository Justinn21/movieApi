export function renderSkeletons(): void {
  const grid = document.getElementById("movie-grid")
  if (!grid) return

  let html = ""

  for (let i = 0; i < 12; i++) {
    html += `
      <div class="card bg-base-200 animate-pulse">
        <figure class="h-64 bg-base-300"></figure>
        <div class="card-body">
          <div class="h-4 bg-base-300 rounded w-3/4"></div>
          <div class="h-3 bg-base-300 rounded w-1/2"></div>
        </div>
      </div>
    `
  }

  grid.innerHTML = html
}