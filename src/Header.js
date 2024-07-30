import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Header() {
  const [color, setColor] = useState('yellowgreen');

  const handleClick = () => {
      setColor('purple');
  };

  return (
      <header className="header">
          <h1 style={{ color: color }} onClick={handleClick}>
              <Link to="/">FreshTomatoes 🍅</Link>
          </h1>
          <nav>
              <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/movies">Movies</Link></li>
                  <li><Link to="/favorites">Favorites</Link></li>
                  <li><Link to="/watchlist">Watchlist</Link></li>
              </ul>
          </nav>
      </header>
  );
}

export default Header;

