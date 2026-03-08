import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export function AuthProvider({children}) {
    const navigate = useNavigate()

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token")
    })

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem("token")
    })

    function login(receivedToken) {
        localStorage.setItem("token", receivedToken)
        setToken(receivedToken)
        setIsAuthenticated(true)

        navigate("/dashboard")
    }

    function logout() {
        localStorage.removeItem("token")
        setToken(null)
        setIsAuthenticated(false)

        navigate("/")
    }
    
    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                login,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    )
}