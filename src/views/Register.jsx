// Importo las dependencias necesarias
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../css/Register.css";

const Register = () => {
  const navigate = useNavigate();

  // Estados para cada campo del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validación de formato de correo con RegEx
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Obtener usuarios guardados en localStorage
  const getStoredUsers = () =>
    JSON.parse(localStorage.getItem("users")) || [];

  // Guardar usuarios actualizados en localStorage
  const storeUsers = (users) =>
    localStorage.setItem("users", JSON.stringify(users));

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Normalizo los datos (quito espacios y paso email a minúsculas)
    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    // Validaciones básicas
    if (!trimmedName || !normalizedEmail || !password || !confirmPassword)
      return toast.error("Todos los campos son obligatorios");

    if (!isValidEmail(normalizedEmail))
      return toast.error("Correo inválido");

    if (password.length < 6)
      return toast.error("La contraseña debe tener al menos 6 caracteres");

    if (password !== confirmPassword)
      return toast.error("Las contraseñas no coinciden");

    const users = getStoredUsers();

    // Verificar duplicados por email o nombre
    if (users.some((user) => user.email === normalizedEmail))
      return toast.error("El correo ya está registrado");

    if (users.some((user) => user.name.toLowerCase() === trimmedName.toLowerCase()))
      return toast.error("El nombre de usuario ya existe");

    // Agrego el nuevo usuario
    users.push({ name: trimmedName, email: normalizedEmail, password });
    storeUsers(users);

    toast.success("Registro exitoso");
    navigate("/login");
  };

  // JSX del formulario
  return (
    <div className="register-bg">
      <div className="register-card">
        <h2 className="register-title">Registro</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          {/* Nombre de usuario */}
          <div>
            <label>Nombre de Usuario</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="ej: juan123"
            />
          </div>

          {/* Correo electrónico */}
          <div>
            <label>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ejemplo@correo.com"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>

          {/* Confirmación de contraseña */}
          <div>
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>

          {/* Botón de registro */}
          <button type="submit" className="btn-register">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
