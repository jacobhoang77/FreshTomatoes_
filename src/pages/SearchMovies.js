import React, { useState, useEffect } from 'react';
import fetchMovies from '../Filter'; 
import './SearchMovies.css';
const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('popular'); 
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedMovies = await fetchMovies(category); 
        setMovies(fetchedMovies);
        setFilteredMovies(fetchedMovies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [category]);

  const searchMovies = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
    setLoading(false);
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
      <div className="filters">
        <label htmlFor="category">FILTER:</label>
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">ALL</option>
          <option value="top_rated">TOP RATED</option>
          <option value="popular">POPULAR</option>
          <option value="now_playing">NOW PLAYING</option>
          <option value="upcoming">UPCOMING</option>
        </select>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="movie-results">
        {filteredMovies.length > 0 && (
          <ul>
            {filteredMovies.map((movie) => (
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
