import React, { useEffect, useState } from 'react';
import './Home.css';

const API_KEY = 'f71a63058781b41be67992f9e77f6da4';
const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzFhNjMwNTg3ODFiNDFiZTY3OTkyZjllNzdmNmRhNCIsIm5iZiI6MTcyMjI5MjgyNS4yODg3MDQsInN1YiI6IjY2YTgxOWUwNmE3ZTFhMDE5MjhjOWRjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c27yQxSBea0btlLS2XPKENd5yHHlP4K5sWdLFVa0m0I'
  }
};

function Home() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`, options);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setNowPlayingMovies(data.results || []);
      } catch (error) {
        console.error('Error fetching now playing movies:', error);
      }
    };

    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`, options);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTopRatedMovies(data.results || []);
      } catch (error) {
        console.error('Error fetching top rated movies:', error);
      }
    };

    const fetchUpcomingMovies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`, options);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setUpcomingMovies(data.results || []);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };

    const fetchRandomMovie = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`, options);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setRandomMovie(data.results[randomIndex]);
        } else {
          throw new Error('No popular movie found');
        }
      } catch (error) {
        console.error('Error fetching random movie:', error);
      }
    };

    fetchNowPlayingMovies();
    fetchTopRatedMovies();
    fetchUpcomingMovies();
    fetchRandomMovie();
  }, []);

  const renderMovieSection = (title, movies) => (
    <section className="movie-section">
      <h2>{title}</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className="movie-poster" />
            <div className="movie-info">
              <h3>{movie.title} ({new Date(movie.release_date).getFullYear()})</h3>
              <p><strong>Rating:</strong> {movie.vote_average}</p>
              <p><strong>Release Date:</strong> {movie.release_date}</p>
              <p><strong>Overview:</strong> {movie.overview}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <div className="home">
      {renderMovieSection("Now Playing", nowPlayingMovies)}
      {renderMovieSection("Top Rated Movies of All Time", topRatedMovies)}
      {renderMovieSection("Upcoming Movies", upcomingMovies)}
      {randomMovie && (
        <section className="random-movie">
          <h2>Random Movie</h2>
          <div className="movie-item">
            <img src={`https://image.tmdb.org/t/p/w200${randomMovie.poster_path}`} alt={randomMovie.title} className="movie-poster" />
            <div className="movie-info">
              <h3>{randomMovie.title} ({new Date(randomMovie.release_date).getFullYear()})</h3>
              <p><strong>Rating:</strong> {randomMovie.vote_average}</p>
              <p><strong>Release Date:</strong> {randomMovie.release_date}</p>
              <p><strong>Overview:</strong> {randomMovie.overview}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
