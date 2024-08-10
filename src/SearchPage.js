import React from 'react';
import SearchMovies from './pages/SearchMovies';
import './pages/SearchPage.css'; 

function SearchPage() {
  return (
    <div className="search">
      <h2 className="search-title">SEARCH FOR MOVIES:</h2>
      <SearchMovies />
    </div>
  );
}

export default SearchPage;
