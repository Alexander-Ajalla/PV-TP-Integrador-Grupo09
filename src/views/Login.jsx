// Importo los hooks y librerías necesarias
import { useState } from "react"; // Para manejar el estado de los inputs (email y contraseña)
import { useNavigate } from "react-router-dom"; // Para redirigir al usuario después de loguearse
import { toast } from "react-hot-toast"; // Para mostrar mensajes emergentes (éxito o error)
import { useDispatch } from "react-redux"; // Para despachar acciones a Redux
import { login } from "../store/authSlice"; // Importo la acción login desde el slice de autenticación
import "../css/Login.css"; // Estilos personalizados para el componente
import logo from "../assets/logo2.png"; // Logo de la aplicación

// Defino el componente funcional Login
const Login = () => {
  // Estados locales para manejar los campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Inicializo el dispatch de Redux y el navegador
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Traigo los usuarios almacenados en localStorage (array de objetos)
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Busco si hay un usuario que coincida con el email y contraseña ingresados
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    // Si se encuentra un usuario válido
    if (user) {
      // Guardo el usuario en localStorage como sesión activa
      localStorage.setItem(
        "sessionUser",
        JSON.stringify({ name: user.name, email: user.email })
      );

      // Despacho la acción login al store de Redux con los datos del usuario
      dispatch(login({ name: user.name, email: user.email }));

      // Muestro mensaje de bienvenida
      toast.success(`Bienvenido, ${user.email}`);

      // Redirijo al usuario al home
      navigate("/");
    } else {
      // Si no se encontró el usuario, muestro error
      toast.error("Credenciales inválidas");
    }
  };

  // JSX del formulario de login
  return (
    <div className="login-bg"> {/* Fondo del login */}
      <div className="login-card"> {/* Tarjeta del formulario */}
        <div className="login-header"> {/* Encabezado con logo y título */}
          <img
            src={logo}
            alt="Logo"
            className="login-logo"
          />
          <h2 className="login-title">Iniciar Sesión</h2>
          <p className="login-subtitle">¡Bienvenido a TecnoStore!</p>
        </div>

        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleSubmit}>
          {/* Campo de email */}
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado con lo que escribe el usuario
              required
              autoComplete="username"
              placeholder="ejemplo@email.com"
            />
          </div>

          {/* Campo de contraseña */}
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado con lo que escribe el usuario
              required
              autoComplete="current-password"
              placeholder="********"
            />
          </div>

          {/* Botón de ingresar */}
          <button type="submit" className="btn-login">
            Ingresar
          </button>

          {/* Enlace para registrarse si no tiene cuenta */}
          <div className="login-register-link">
            <span>¿No tienes cuenta? </span>
            <a href="/register">Regístrate aquí</a>
          </div>
        </form>

        {/* Info para probar el login sin crear cuenta */}
        <div className="login-demo">
          <small>Usuario demo: admin@gmail.com / 123456</small>
        </div>
      </div>
    </div>
  );
};

// Exporto el componente para poder usarlo en otras partes de la app
export default Login;
