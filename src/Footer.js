import React from 'react';
import './Footer.css'; 
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About FreshTomatoes</h3>
          <p>FreshTomatoes is your go-to source for movie reviews, ratings, and information on all the latest releases.</p>
          <p>From Movie Nerd, For Movie Nerd!</p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/movies">Popular Movies</a></li>
            <li><a href="/reviews">Movie Reviews</a></li>
            <li><a href="/surpriseme">Surprise Me!</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 FreshTomatoes. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
