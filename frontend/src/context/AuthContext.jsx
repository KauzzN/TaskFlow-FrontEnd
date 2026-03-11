import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const navigate = useNavigate()

  const [token, setToken] = useState(() => {
    return localStorage.getItem("access_token")
  })

  const isAuthenticated = !!token

  function login(access_token, refresh_token) {

    localStorage.setItem("access_token", access_token)
    localStorage.setItem("refresh_token", refresh_token)

    setToken(access_token)
    
    navigate("/dashboard")
  }

  function logout() {
    
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")

    setToken(null)
    
    navigate("/")
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}