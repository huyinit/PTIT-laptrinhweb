// Render movie cards or display messages in the grid container
export const renderMovies = (container, movies) => {
  if (!movies.length) return container.innerHTML = '<div class="info">No movies found.</div>';
  // Use reduce() to construct the HTML list string
  container.innerHTML = movies.reduce((acc, { name, year, type, poster }) => acc + `
    <div class="card">
      <img src="${poster}" alt="${name}">
      <h3>${name}</h3>
      <p>📅 ${year} | 🏷️ ${type}</p>
    </div>
  `, '');
};

// Show a message when search is in progress
export const showLoading = (container) => container.innerHTML = '<div class="info">Searching...</div>';

// Show error messages
export const showError = (container, msg) => container.innerHTML = `<div class="info" style="color:#ff4a4a">❌ Error: ${msg}</div>`;
