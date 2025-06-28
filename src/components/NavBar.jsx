import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaLaptopCode } from "react-icons/fa";
import "../css/NavBar.css";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";


const Navbar = () => {
  const totalUnits = useSelector((state) => state.cart.totalUnits);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();   

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

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
        <ul className="navbar-nav ms-auto align-items-center gap-3">
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <span className="navbar-text me-3">
                  Bienvenido, {user?.email}
                </span>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link custom-navlink ${isActive ? "active" : ""}`
                  }
                  to="/"
                >
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link custom-navlink ${isActive ? "active" : ""}`
                  }
                  to="/favoritos"
                >
                  Favoritos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link custom-navlink ${isActive ? "active" : ""}`
                  }
                  to="/crear"
                >
                  Crear Producto
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/carrito"
                  className={({ isActive }) =>
                    `nav-link custom-navlink ${isActive ? "active" : ""}`
                  }
                >
                  Carrito 🛒 ({totalUnits})
                </NavLink>
              </li>
              
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link custom-navlink ${isActive ? "active" : ""}`
                  }
                  to="/acerca"
                >
                  Acerca
                </NavLink>
              </li>
              <li className="nav-item">
                <ThemeToggle />
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                  title="Cerrar Sesión"
                  aria-label="Cerrar Sesión"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <i className="bi bi-box-arrow-right" style={{ fontSize: "1.3rem" }}></i>
                </button>
              </li>
              
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Iniciar Sesión
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Registrarse
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link custom-navlink ${isActive ? "active" : ""}`
                  }
                  to="/acerca"
                >
                  Acerca
                </NavLink>
              </li>
              <li className="nav-item">
                <ThemeToggle />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
