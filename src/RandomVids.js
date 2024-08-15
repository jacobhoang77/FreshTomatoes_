import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'f71a63058781b41be67992f9e77f6da4';
const BASE_URL = 'https://api.themoviedb.org/3';

const SurpriseMe = () => {
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomMovie = async () => {
    setLoading(true);
    setError(null);

    try {
      const categories = ['now_playing', 'popular', 'top_rated', 'upcoming'];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];

      const response = await axios.get(`${BASE_URL}/movie/${randomCategory}`, {
        params: { language: 'en-US', page: Math.floor(Math.random() * 10) + 1 },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzFhNjMwNTg3ODFiNDFiZTY3OTkyZjllNzdmNmRhNCIsIm5iZiI6MTcyMjI5MjgyNS4yODg3MDQsInN1YiI6IjY2YTgxOWUwNmE3ZTFhMDE5MjhjOWRjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c27yQxSBea0btlLS2XPKENd5yHHlP4K5sWdLFVa0m0I'
        },
      });

      const randomMovie = response.data.results[Math.floor(Math.random() * response.data.results.length)];
      setMovie(randomMovie);

      const trailerResponse = await axios.get(`${BASE_URL}/movie/${randomMovie.id}/videos`, {
        params: { language: 'en-US' },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzFhNjMwNTg3ODFiNDFiZTY3OTkyZjllNzdmNmRhNCIsIm5iZiI6MTcyMjI5MjgyNS4yODg3MDQsInN1YiI6IjY2YTgxOWUwNmE3ZTFhMDE5MjhjOWRjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c27yQxSBea0btlLS2XPKENd5yHHlP4K5sWdLFVa0m0I'
        },
      });

      const trailer = trailerResponse.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } else {
        setTrailerUrl('');
      }

    } catch (error) {
      setError('Failed to load a movie. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="surprise-me">
      {movie && (
        <div className="movie-details">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          {trailerUrl ? (
            <iframe
              src={trailerUrl}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p>Trailer not available.</p>
          )}
          <button onClick={fetchRandomMovie}>Surprise Me Again!</button>
        </div>
      )}
    </div>
  );
};

export default SurpriseMe;
