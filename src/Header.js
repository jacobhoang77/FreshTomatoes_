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
          <li><NavLink to="/" exact="true" activeclassname="active">HOME</NavLink></li>
          <li><NavLink to="/movies" activeclassname="active">_</NavLink></li>
          <li><NavLink to="/surpriseme" activeclassname="active">SUPRISE ME!</NavLink></li>
          <li><NavLink to="/login" activeclassname="active">LOGIN</NavLink></li>
          <li className="header-search"><NavLink to="/search" activeclassname="active">SEARCH</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
