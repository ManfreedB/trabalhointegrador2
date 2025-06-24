import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/" />
    }

    const validateToken = async () => {
        try {
            await axios.get('https://integrador-backend.herokuapp.com/protected/validate-token', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error("Token inválido ou expirado: " + error);
            localStorage.removeItem('token');
            window.location.href = '/';
        }
    };

    validateToken();

    return children;
}

export default ProtectedRoute;