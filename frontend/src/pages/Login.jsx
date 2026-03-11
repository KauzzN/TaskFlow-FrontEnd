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

<<<<<<< HEAD
      const { access_token } = response.data

      login(access_token)
=======
      const { access_token } = response.data.data
      const { refresh_token } = response.data.data

      login(access_token, refresh_token)
>>>>>>> 90582d7 (added auto refresh tokens)

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
