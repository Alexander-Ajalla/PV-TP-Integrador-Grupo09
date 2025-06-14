import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaLaptopCode } from 'react-icons/fa';
import '../css/NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar px-4">
      <NavLink className="navbar-brand d-flex align-items-center" to="/">
        <FaLaptopCode className="me-2 logo-icon" />
        <span className="orbitron-font">TecnoStore</span>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => `nav-link custom-navlink ${isActive ? 'active' : ''}`}
              to="/"
            >
              Inicio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => `nav-link custom-navlink ${isActive ? 'active' : ''}`}
              to="/favoritos"
            >
              Favoritos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => `nav-link custom-navlink ${isActive ? 'active' : ''}`}
              to="/crear"
            >
              Crear Producto
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

