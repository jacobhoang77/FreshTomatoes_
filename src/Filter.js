import axios from 'axios';

const API_KEY = 'f71a63058781b41be67992f9e77f6da4';
const BASE_URL = 'https://api.themoviedb.org/3';
const AUTH_TOKEN = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzFhNjMwNTg3ODFiNDFiZTY3OTkyZjllNzdmNmRhNCIsIm5iZiI6MTcyMzY4OTI1MC45NjU4MjgsInN1YiI6IjY2YTgxOWUwNmE3ZTFhMDE5MjhjOWRjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i31dY9qPIcynkPZEizd6b4LrSYHB5h5AbnTTr6pYHs4`;

const fetchMovies = async (category) => {
  let endpoints = [];

  switch (category) {
    case 'top_rated':
      endpoints.push('/movie/top_rated');
      break;
    case 'popular':
      endpoints.push('/movie/popular');
      break;
    case 'now_playing':
      endpoints.push('/movie/now_playing');
      break;
    case 'upcoming':
      endpoints.push('/movie/upcoming');
      break;
    case 'all':
      endpoints = ['/movie/top_rated', '/movie/popular', '/movie/now_playing', '/movie/upcoming'];
      break;
    default:
      throw new Error('Unknown category');
  }

  try {
    const requests = endpoints.map((endpoint) =>
      axios.get(`${BASE_URL}${endpoint}`, {
        params: { language: 'en-US', page: '1' },
        headers: {
          accept: 'application/json',
          Authorization: AUTH_TOKEN,
        },
      })
    );

    const responses = await Promise.all(requests);
    const movies = responses.flatMap((response) => response.data.results);
    return movies;
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
    return [];
  }
};

export default fetchMovies;
