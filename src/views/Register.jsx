import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../css/Register.css";

const Register = () => {
  const navigate = useNavigate();

  // Estados controlados para los campos del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Valida formato básico de email
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  /**
   * ^	Inicio del string
   * [^\s@]+	Uno o más caracteres que no sean espacio (\s) ni @ → esto valida la parte del nombre de usuario
   * @	Debe contener exactamente un @
   * [^\s@]+	Uno o más caracteres que no sean espacio ni @ → valida el dominio
   * \.	Literalmente un punto . (el \ escapa el punto, que es un carácter especial en regex)
   * [^\s@]+	Uno o más caracteres que no sean espacio ni @ → valida la extensión del dominio
   * $	Fin del string
   *
   * Para validaciones más estrictas, se recomienda:
   * Usar librerías como validator.js
   */
  // Obtiene usuarios registrados desde localStorage
  const getStoredUsers = () => JSON.parse(localStorage.getItem("users")) || [];

  // Guarda usuarios en localStorage
  const storeUsers = (users) =>
    localStorage.setItem("users", JSON.stringify(users));

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones de email y contraseña
    if (!isValidEmail(email)) return toast.error("Correo inválido");
    if (password.length < 6)
      return toast.error("Contraseña debe tener al menos 6 caracteres");
    if (password !== confirmPassword)
      return toast.error("Las contraseñas no coinciden");

    const users = getStoredUsers();

    // Verifica que el correo o el nombre de usuario no estén repetidos
    if (users.some((user) => user.email === email))
      return toast.error("El correo del usuario ya existe");
    if (users.some((user) => user.name === name))
      return toast.error("El nombre de usuario ya existe");

    // Agrega nuevo usuario y guarda en localStorage
    users.push({ name, email, password });
    storeUsers(users);

    toast.success("Registro exitoso");
    navigate("/login");
  };

  return (
    <div className="register-bg">
      <div className="register-card">
        <h2 className="register-title">Registro</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div>
            <label>Nombre de Usuario</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-register">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
