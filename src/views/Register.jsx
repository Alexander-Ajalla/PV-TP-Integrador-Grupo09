import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../css/Register.css"; 

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const getStoredUsers = () => JSON.parse(localStorage.getItem("users")) || [];
  const storeUsers = (users) =>
    localStorage.setItem("users", JSON.stringify(users));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) return toast.error("Correo inválido");
    if (password.length < 6)
      return toast.error("Contraseña debe tener al menos 6 caracteres");
    if (password !== confirmPassword)
      return toast.error("Las contraseñas no coinciden");

    const users = getStoredUsers();
    if (users.some((user) => user.email === email))
      return toast.error("El correo del usuario ya existe");
    if (users.some((user) => user.name === name))
      return toast.error("El nombre de usuario ya existe");

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
          <button type="submit" className="btn-register">Registrarse</button>
        </form>
      </div>
    </div>
);

};

export default Register;
