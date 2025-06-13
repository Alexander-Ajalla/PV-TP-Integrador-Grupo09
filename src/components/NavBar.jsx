import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlineHeart, AiOutlinePlusCircle } from 'react-icons/ai';
import '../css/NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-3" to="/">
          JC store
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'nav-link active fw-semibold d-flex align-items-center' : 'nav-link d-flex align-items-center'
                }
                end
              >
                <AiOutlineHome className="me-1" size={20} />
                Inicio
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink
                to="/favoritos"
                className={({ isActive }) =>
                  isActive ? 'nav-link active fw-semibold d-flex align-items-center' : 'nav-link d-flex align-items-center'
                }
              >
                <AiOutlineHeart className="me-1" size={20} />
                Favoritos
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink
                to="/crear"
                className={({ isActive }) =>
                  isActive ? 'nav-link active fw-semibold d-flex align-items-center' : 'nav-link d-flex align-items-center'
                }
              >
                <AiOutlinePlusCircle className="me-1" size={20} />
                Crear Producto
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
