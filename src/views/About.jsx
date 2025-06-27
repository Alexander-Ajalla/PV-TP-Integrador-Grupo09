// src/views/About.jsx
import '../css/About.css';
import logoFi from '../assets/logo-fi-unju-gran-formato-horizontal-3000x683.png';

function About() {
  return (
    <div className="about container py-4">
      <img src={logoFi} alt="Logo FI" className="img-fluid mb-4" style={{ maxWidth: '400px' }} />

      <h2 className="mb-4 orbitron-font">Sistema de Gestión de Productos</h2>

      <div className="about-content">
        <p>
          Este proyecto es una <strong>aplicación web SPA</strong> desarrollada como parte del
          <strong> Trabajo Integrador</strong> del Grupo 9 para la materia de Visualización de Datos.
          Permite gestionar productos de forma sencilla, organizada y con una interfaz moderna.
        </p>

        <h3 className="mt-4">📚 Descripción</h3>
        <p>
          La aplicación permite <strong>crear, editar, eliminar y visualizar productos</strong> con una navegación fluida
          gracias a React Router. El estado global se gestiona con <strong>Redux</strong> para mantener la información sincronizada
          entre las diferentes vistas.
        </p>

        <h3 className="mt-4">⚙️ Funcionalidades Principales</h3>
        <ul>
          <li>🖼️ Listado de productos con imagen, nombre, precio, descripción y categoría.</li>
          <li>⭐ Marcar y desmarcar productos como favoritos.</li>
          <li>📂 Página dedicada a productos favoritos.</li>
          <li>🔍 Vista detallada de cada producto.</li>
          <li>📝 Formulario para crear y editar productos.</li>
        </ul>

        <h3 className="mt-4">🛠️ Tecnologías Utilizadas</h3>
        <ul>
          <li>⚛️ React + Vite</li>
          <li>🌐 React Router DOM</li>
          <li>🎨 Bootstrap y Bootstrap Icons</li>
          <li>🔄 Redux Toolkit + React Redux</li>
          <li>🔥 React Hot Toast para notificaciones</li>
        </ul>

        <h3 className="mt-4">🌐 Consumo de API</h3>
        <p>
          La aplicación utiliza la API pública: <a href="https://fakestoreapi.com/products" target="_blank" rel="noopener noreferrer">Fake Store API</a> para obtener productos reales al iniciar la aplicación.
        </p>

        <h3 className="mt-4">👥 Integrantes del Grupo 9</h3>
        <ul>
          <li>Alexander Natanael Ajalla ➡ <a href="https://github.com/Alexander-Ajalla" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li>Barrientos Lautaro Nicolás ➡ <a href="https://github.com/BarrientosLautaro" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li>Ivo Thaiel Vicencio Rosas ➡ <a href="https://github.com/ivothaiel" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li>Álvarez Carlos Matías ➡ <a href="https://github.com/MintBlue06" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li>Sánchez Ariel Maximiliano ➡ <a href="https://github.com/MaxiSanchez27" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
      </div>
    </div>
  );
}

export default About;
