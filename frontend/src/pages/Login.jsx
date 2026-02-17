import React, { useState } from "react"
import { api } from "../services/api"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    console.log("Usuário:", username)
    console.log("Senha:", password)

    try {
      // exemplo fictício
      const response = await api.post("/accounts/login", {
        username,
        password
      })

      console.log("Resposta:", response.data)

    } catch (error) {
      console.error("Erro ao logar:", error)
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Tela de Login</h1>

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
