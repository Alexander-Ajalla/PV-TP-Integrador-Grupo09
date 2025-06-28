import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from '../store/themeslice';
import { BiSun, BiMoon } from "react-icons/bi"; //para el logo de luna y sol
import '../css/ThemeToggle.css'; // Importa los estilos

const ThemeToggle = () =>{
    const dispatch = useDispatch();
    const {mode} = useSelector((state) => state.theme);

    const handleToggle = () => {
        dispatch(toggleTheme()); 
    };

    return (
        <button 
            className={`theme-toggle-btn btn btn-${mode === 'light' ? 'outline-dark': 'outline-light'} btn-sm`}
            onClick={handleToggle}
            aria-label={mode === 'light' ? 'cambiar a modo oscuro': 'cambiara a modo claro'}
        >
            {mode === 'light' ? <BiMoon/> : <BiSun/>}
        </button>
    )
}

export default ThemeToggle;