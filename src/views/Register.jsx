// Importo las dependencias necesarias
import { useState } from "react"; // Hook para manejar estados locales
import { useNavigate } from "react-router-dom"; // Para redireccionar al login después del registro
import { toast } from "react-hot-toast"; // Para mostrar mensajes emergentes de éxito o error
import "../css/Register.css"; // Estilos específicos del formulario de registro

// Componente funcional Register
const Register = () => {
  const navigate = useNavigate(); // Me permite redirigir al usuario luego del registro

  // Defino los estados para cada campo del formulario
  const [name, setName] = useState(""); // Estado para el nombre de usuario
  const [email, setEmail] = useState(""); // Estado para el correo electrónico
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para confirmar la contraseña

  // Valido si el correo tiene un formato correcto usando una expresión regular
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Traigo los usuarios guardados desde localStorage o devuelvo un array vacío si no hay ninguno
  const getStoredUsers = () => JSON.parse(localStorage.getItem("users")) || [];

  // Guardo un array de usuarios actualizado en localStorage
  const storeUsers = (users) =>
    localStorage.setItem("users", JSON.stringify(users));

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el refresh automático del formulario

    // Validaciones básicas del formulario
    if (!isValidEmail(email)) return toast.error("Correo inválido");
    if (password.length < 6)
      return toast.error("Contraseña debe tener al menos 6 caracteres");
    if (password !== confirmPassword)
      return toast.error("Las contraseñas no coinciden");

    const users = getStoredUsers(); // Obtengo usuarios actuales del localStorage

    // Verifico si ya existe un usuario con ese correo o nombre
    if (users.some((user) => user.email === email))
      return toast.error("El correo del usuario ya existe");
    if (users.some((user) => user.name === name))
      return toast.error("El nombre de usuario ya existe");

    // Si todo está bien, agrego el nuevo usuario al array
    users.push({ name, email, password });
    storeUsers(users); // Lo guardo en localStorage

    // Muestro mensaje de éxito y redirijo al login
    toast.success("Registro exitoso");
    navigate("/login");
  };

  // Retorno el JSX del formulario
  return (
    <div className="register-bg">
      {" "}
      {/* Fondo del formulario */}
      <div className="register-card">
        {" "}
        {/* Tarjeta con el formulario */}
        <h2 className="register-title">Registro</h2>
        {/* Formulario de registro */}
        <form className="register-form" onSubmit={handleSubmit}>
          {/* Campo: Nombre */}
          <div>
            <label>Nombre de Usuario</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} // Actualizo el estado
              required
            />
          </div>

          {/* Campo: Correo */}
          <div>
            <label>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo: Contraseña */}
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Campo: Confirmar contraseña */}
          <div>
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Botón de enviar */}
          <button type="submit" className="btn-register">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

// Exporto el componente para usarlo en el router
export default Register;
