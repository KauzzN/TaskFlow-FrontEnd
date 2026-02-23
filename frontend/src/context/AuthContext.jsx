import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()


export function AuthProvider({children}) {
    const [token, setToken] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const storedToken = localStorage.getItem("token")

        if (storedToken) {
            setToken(storedToken)
            setIsAuthenticated(true)
        }
    }, [])

    function login(access_token) {
        localStorage.setItem("token", access_token)
        setToken(access_token)
        setIsAuthenticated(true)
        navigate("dashboard/")
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