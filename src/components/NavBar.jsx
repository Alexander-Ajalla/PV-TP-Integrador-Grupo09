import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaHeart, FaPlus } from 'react-icons/fa';
import '../css/NavBar.css'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
           JCstore
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-1" to="/">
                <FaHome /> Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-1" to="/favoritos">
                <FaHeart /> Favoritos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-1" to="/crear">
                <FaPlus /> Crear Producto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
