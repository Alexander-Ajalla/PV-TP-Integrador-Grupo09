import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import "../css/Login.css";
import logo from "../assets/logo2.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem(
        "sessionUser",
        JSON.stringify({ name: user.name, email: user.email })
      );
      dispatch(login({ name: user.name, email: user.email }));
      toast.success(`Bienvenido, ${user.email}`);
      navigate("/");
    } else {
      toast.error("Credenciales inválidas");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-header">
          <img
            src={logo}
            alt="Logo"
            className="login-logo"
          />
          <h2 className="login-title">Iniciar Sesión</h2>
          <p className="login-subtitle">¡Bienvenido a TecnoStore!</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              placeholder="ejemplo@email.com"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="********"
            />
          </div>
          <button type="submit" className="btn-login">
            Ingresar
          </button>
          <div className="login-register-link">
            <span>¿No tienes cuenta? </span>
            <a href="/register">Regístrate aquí</a>
          </div>
        </form>
        <div className="login-demo">
          <small>Usuario demo: admin@gmail.com / 123456</small>
        </div>
      </div>
    </div>
  );
};

export default Login;