import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css'; 
import logo from './tlogo.jpg'; 

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <h1>FRESHTOMATOES</h1> 
        <img src={logo} alt="Logo" className="logo" /> 
      </Link>
      <nav>
        <ul>
          <li><NavLink to="/" exact="true" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/movies" activeClassName="active">Movies</NavLink></li>
          <li><NavLink to="/favorites" activeClassName="active">Favorites</NavLink></li>
          <li><NavLink to="/watchlist" activeClassName="active">Watchlist</NavLink></li>
          <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
          <li className="header-search"><NavLink to="/search" activeClassName="active">Search</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
