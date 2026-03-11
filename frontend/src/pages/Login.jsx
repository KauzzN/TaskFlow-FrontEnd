import "./Login.css"
import React, { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { api } from "../services/api"

function Login() {
  const { login } = useContext(AuthContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  async function handleSubmit(e) {
    e.preventDefault()

    try {
      // exemplo fictício
      const response = await api.post("/accounts/login/", {
        username,
        password
      })

      console.log(response.data)

      const tokens = response.data.data

      if (!tokens) {
        throw new Error("API não retornou tokens")
      }

      console.log(tokens.access_token, tokens.refresh_token)

      login(tokens.access_token, tokens.refresh_token)

      console.log("Logado com sucesso");

    } catch (error) {
      console.error("Erro ao logar:", error)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
      <h1>Login</h1>

        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
        </div>

        <button className="login-btn" type="submit">
          Entrar
        </button>

      </form>
        <p className="register-redirect">
          Não tem conta?
        </p>

        <Link to="/cadastro" className="register-box">
          Criar conta
        </Link>
    </div>
  )
}

export default Login
