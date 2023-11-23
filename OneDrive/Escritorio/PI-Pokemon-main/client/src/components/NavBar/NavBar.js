import React from 'react';
import { useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();

  return (
    <div className="navbar-container">
      <a href="/" className="nav-link">
        Pokemones
      </a>
      <div className="nav-links">
        {location.pathname !== "/" && (
          <a href="/home" className="nav-link">
            Home
          </a>
        )}
        {location.pathname !== "/" && (
          <a href="/create-pokemon" className="nav-link">
            Crear Pokemon
          </a>
        )}
      </div>
    </div>
  );
}

export default NavBar;
