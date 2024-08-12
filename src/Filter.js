export const filterMoviesByCategory = (movies, category) => {
  switch (category) {
    case 'BoxOffice':
      return movies.filter(movie => movie.boxOffice);
    case 'InTheaters':
      return movies.filter(movie => movie.inTheaters);
    case 'Opening':
      return movies.filter(movie => movie.opening);
    case 'Upcoming':
      return movies.filter(movie => movie.upcoming);
    default:
      return movies;
  }
};
