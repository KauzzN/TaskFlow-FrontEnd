import React, { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../services/api"
import { AuthContext } from "../context/AuthContext"

function Login() {
  const { login } = useContext(AuthContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      // exemplo fictício
      const response = await api.post("/accounts/login/", {
        username,
        password
      })

      const { token } = response.data

      login(token)

      navigate("/dashboard")

      console.log("Logado com sucesso");

    } catch (error) {
      console.error("Erro ao logar:", error)
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu Usuario"
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>

        <button style={{ marginTop: "15px" }} type="submit">
          Entrar
        </button>
      </form>
    </div>
  )
}

export default Login
