// Fetch show results from TVMaze search API and normalize fields
export const fetchMovies = async (query) => {
  try {
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    // Destructuring in map argument to extract show property
    return data.map(({ show }) => ({
      id: show.id,
      name: show.name,
      year: show.premiered ? show.premiered.split('-')[0] : 'N/A',
      type: show.type || 'N/A',
      // Safe navigation operator and fallback image link
      poster: show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'
    }));
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};
