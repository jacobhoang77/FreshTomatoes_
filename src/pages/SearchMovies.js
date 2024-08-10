import React, { useState } from 'react';
import './SearchMovies.css';

const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovies = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const API_KEY = 'f71a63058781b41be67992f9e77f6da4';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzFhNjMwNTg3ODFiNDFiZTY3OTkyZjllNzdmNmRhNCIsIm5iZiI6MTcyMjI5MjgyNS4yODg3MDQsInN1YiI6IjY2YTgxOWUwNmE3ZTFhMDE5MjhjOWRjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c27yQxSBea0btlLS2XPKENd5yHHlP4K5sWdLFVa0m0I`,
      },
    };

    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        options
      );

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={searchMovies}>
        <label htmlFor="query">Movie Name:</label>
        <input
          type="text"
          name="query"
          placeholder="Search for a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="movie-results">
        {movies.length > 0 && (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id} className="movie-card">
                <img 
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} 
                  alt={`${movie.title} Poster`} 
                  className="movie-poster"
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.overview}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchMovies;
