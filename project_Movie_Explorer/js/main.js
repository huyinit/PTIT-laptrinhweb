import { fetchMovies } from './api.js';
import { renderMovies, showLoading, showError } from './ui.js';

let allMovies = [];
let currentPage = 1;
const limit = 4; // Display 4 movies per page for easy demo pagination

const results = document.getElementById('results');
const pageNum = document.getElementById('page-num');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// Filter and slice movie data, then update display
const updateUI = () => {
  const yearVal = document.getElementById('year').value;
  const typeVal = document.getElementById('type').value;
  
  // Use filter() to filter list by year and type
  const filtered = allMovies.filter(({ year, type }) => 
    (!yearVal || year === yearVal) && 
    (!typeVal || type === typeVal)
  );

  const totalPages = Math.ceil(filtered.length / limit) || 1;
  currentPage = Math.min(currentPage, totalPages);
  
  const start = (currentPage - 1) * limit;
  // Use spread operator to duplicate and slice the array
  const pageMovies = [...filtered].slice(start, start + limit);
  
  renderMovies(results, pageMovies);
  pageNum.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
};

// Handle form submit for movie searching
document.getElementById('search-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  showLoading(results);
  try {
    allMovies = await fetchMovies(document.getElementById('query').value);
    currentPage = 1;
    updateUI();
  } catch (err) {
    showError(results, err.message);
  }
});

const changePage = (offset) => {
  currentPage += offset;
  updateUI();
};

prevBtn.addEventListener('click', () => changePage(-1));
nextBtn.addEventListener('click', () => changePage(1));
document.getElementById('year').addEventListener('input', () => { currentPage = 1; updateUI(); });
document.getElementById('type').addEventListener('change', () => { currentPage = 1; updateUI(); });
