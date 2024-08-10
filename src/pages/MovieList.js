import React, { useEffect, useState } from 'react';

const API_KEY = 'dbc2a3c636mshd1a891d0647a30ep110856jsn82bcb945cb54';
const BASE_URL = 'https://moviesdatabase.p.rapidapi.com';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/titles`, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
          },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-list">
      <h2>Movie List</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
