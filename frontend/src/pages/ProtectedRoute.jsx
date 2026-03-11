import React from "react"
import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute