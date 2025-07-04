import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './css/ThemeToggle.css'

createRoot(document.getElementById("root")).render(
  <StrictMode> 
    <Provider store={store}> 
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
// * <StrictMode> control para posibles errores
// * <Provider store={store}>  Proporciona el store de redux, para usar useDispatch y useSelector
// * <BrowserRouter>  Proporciona el contexto de navegacion (routes,route, link, navLink, useNavigate)