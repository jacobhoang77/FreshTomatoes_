import axios from 'axios';

const API_KEY = 'f71a63058781b41be67992f9e77f6da4';
const BASE_URL = 'https://api.themoviedb.org/3';
const AUTH_TOKEN = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzFhNjMwNTg3ODFiNDFiZTY3OTkyZjllNzdmNmRhNCIsIm5iZiI6MTcyMjI5MjgyNS4yODg3MDQsInN1YiI6IjY2YTgxOWUwNmE3ZTFhMDE5MjhjOWRjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c27yQxSBea0btlLS2XPKENd5yHHlP4K5sWdLFVa0m0I`;

const fetchMovies = async (category) => {
  let endpoint = '';

  switch (category) {
    case 'top_rated':
      endpoint = '/movie/top_rated';
      break;
    case 'popular':
      endpoint = '/movie/popular';
      break;
    case 'now_playing':
      endpoint = '/movie/now_playing';
      break;
    default:
      throw new Error('Unknown category');
  }

  try {
    const response = await axios.get(`${BASE_URL}${endpoint}?language=en-US&page=1`, {
      headers: {
        accept: 'application/json',
        Authorization: AUTH_TOKEN,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
    return [];
  }
};

export const filterMoviesByCategory = (movies, category) => {
  switch (category) {
    case 'BoxOffice':
      return movies.filter(movie => movie.box_office);
    case 'InTheaters':
      return movies.filter(movie => movie.in_theaters); 
    case 'Opening':
      return movies.filter(movie => movie.opening); 
    case 'Upcoming':
      return movies.filter(movie => movie.upcoming);
    default:
      return movies;
  }
};

export default fetchMovies;
