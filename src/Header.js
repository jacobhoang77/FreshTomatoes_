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
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>HOME</NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={({ isActive }) => isActive ? "active" : ""}>M-LIST</NavLink> 
          </li>
          <li>
            <NavLink to="/popular-people" className={({ isActive }) => isActive ? "active" : ""}>PEOPLE.</NavLink>
          </li>
          <li>
            <NavLink to="/reviews" className={({ isActive }) => isActive ? "active" : ""}>REVIEWS!</NavLink>
          </li>
          <li>
            <NavLink to="/surpriseme" className={({ isActive }) => isActive ? "active" : ""}>SURPRISE!ME</NavLink>
          </li>
          <li className="header-search">
            <NavLink to="/search" className={({ isActive }) => isActive ? "active" : ""}>SEARCH</NavLink>
          </li>
          <li>
            <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>| LOGIN</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
