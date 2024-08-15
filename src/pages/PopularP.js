import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PopularP.css';

const API_KEY = 'f71a63058781b41be67992f9e77f6da4';
const BASE_URL = 'https://api.themoviedb.org/3';

const PopularPeople = () => {
  const [people, setPeople] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPopularPeople = async (page = 1, searchQuery = '') => {
    try {
      const response = await axios.get(`${BASE_URL}/person/popular`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          page,
          query: searchQuery,
        },
      });
      setPeople(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching popular people:', error);
    }
  };

  useEffect(() => {
    fetchPopularPeople(currentPage, query);
  }, [currentPage, query]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="popular-people-container">
      <h2>Popular People</h2>
      <input
        type="text"
        placeholder="Search for a person..."
        value={query}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="people-grid">
        {people.map(person => (
          <div key={person.id} className="person-card">
            <img
              src={`https://image.tmdb.org/t/p/w200/${person.profile_path}`}
              alt={person.name}
              className="person-image"
            />
            <div className="person-info">
              <h3>{person.name}</h3>
              <p>Know for (Movies): {person.known_for.map(movie => movie.title || movie.name).join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PopularPeople;
