const filterMovies = (movies, category) => {
  switch (category) {
    case 'box_office':
      return movies.filter(movie => movie.boxOffice === true);
    case 'in_theaters':
      return movies.filter(movie => movie.inTheaters === true);
    case 'opening':
      return movies.filter(movie => movie.opening === true);
    case 'upcoming':
      return movies.filter(movie => movie.upcoming === true);
    default:
      return movies;
  }
};

export default filterMovies;
