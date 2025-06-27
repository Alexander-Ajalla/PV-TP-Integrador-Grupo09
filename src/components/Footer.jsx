// src/componentes/Footer.jsx
import '../css/Footer.css';
import { useSelector } from 'react-redux';

function Footer() {
  const year = new Date().getFullYear();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <footer className={`custom-footer footer-${mode}`}>
      <div className="footer-content">
        <span>
          &copy; {year} Sistema de Gestión de Productos | Desarrollado por <strong>Grupo 9</strong>
        </span>
        <div className="social-icons">
          <a href="https://github.com/Alexander-Ajalla/PV-TP-Integrador-Grupo09" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-github"></i>
          </a>
          <a href="https://linkedin.com/in/usuario" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="email:email@example.com">
            <i className="bi bi-envelope-fill"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;