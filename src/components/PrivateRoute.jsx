import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

//aca recibira children como una prop
const PrivateRoute = ({children}) =>{
    /**
     * 1.se lee el estado global si el usuario esta autenticado
     * esto espera que ya este authslice con el estado isauthenticated
     */
    const { isAuthenticated } = useSelector(state => state.auth); //la ruta tiene que ser state.auth

    if (!isAuthenticated) {
        /**
         * 2. si el usuario no se autentico
         * se redirige a la pagina login
         * entoces aca se usaria el componente navigate
         */
        return <Navigate to={"/login"}/>
    }
    return children;
}
export default PrivateRoute;
