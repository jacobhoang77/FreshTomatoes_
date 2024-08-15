import React, { useEffect, useState } from 'react';
import './MovieList.css'; 

const API_KEY = 'f71a63058781b41be67992f9e77f6da4';
const BASE_URL = 'https://api.themoviedb.org/3';
const MOVIES_PER_PAGE = 12;

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedMovie, setExpandedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async (page = 1) => {
      try {
        const response = await fetch(`${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setMovies(data.results.slice(0, MOVIES_PER_PAGE));
        setTotalPages(Math.ceil(data.total_results / MOVIES_PER_PAGE));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const toggleOverview = (movieId) => {
    setExpandedMovie(expandedMovie === movieId ? null : movieId);
  };

  return (
    <div className="movie-list">
      <h2>Popular Movies</h2>
      <ul className="movies-grid">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>RELEASE DATE:{movie.release_date}</p>
              <p>RATING: {movie.vote_average}</p>
              <p className="movie-overview">
                {expandedMovie === movie.id ? movie.overview : `${movie.overview.slice(0, 100)}...`}
              </p>
              <button className="toggle-overview" onClick={() => toggleOverview(movie.id)}>
                {expandedMovie === movie.id ? 'CLOSE' : '...'}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default MovieList;
