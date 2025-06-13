import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/favoritos">Favoritos</Link></li>
        <li><Link to="/crear">Crear Producto</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
