import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reviews.css';

const API_KEY = 'f71a63058781b41be67992f9e77f6da4';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200'; // Define the base URL for fetching images

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReviews = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          page,
        },
      });

      const moviesWithReviews = await Promise.all(
        response.data.results.map(async (movie) => {
          try {
            const reviewResponse = await axios.get(`${BASE_URL}/movie/${movie.id}/reviews`, {
              params: { api_key: API_KEY, language: 'en-US' },
            });
            return {
              ...movie,
              reviews: reviewResponse.data.results,
            };
          } catch (error) {
            console.error(`Error fetching reviews for movie ID ${movie.id}:`, error);
            return { ...movie, reviews: [] }; // Return movie with empty reviews array on error
          }
        })
      );

      setReviews(moviesWithReviews);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching top-rated movies:', error);
      setError('Failed to fetch reviews. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="reviews-container">
      <h2>Movie Reviews</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="reviews-grid">
            {reviews.map((movie) => (
              <div key={movie.id} className="review-card">
                <img 
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
                  alt={`${movie.title} Poster`} 
                  className="movie-poster"
                />
                <h3>{movie.title}</h3>
                <p className="movie-overview">{movie.overview}</p>
                {movie.reviews.length > 0 ? (
                  <div className="review-content">
                    {movie.reviews.slice(0, 2).map((review) => (
                      <div key={review.id} className="review">
                        <p><strong>{review.author}</strong>: {review.content.slice(0, 100)}...</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No reviews available.</p>
                )}
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
        </>
      )}
    </div>
  );
};

export default Reviews;
