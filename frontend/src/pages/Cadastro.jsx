import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { api } from "../services/api"
import { AuthContext } from "../context/AuthContext"
import "./Cadastro.css"

function Cadastro() {
  const { login } = useContext(AuthContext)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMessage("")

    // Validação básica antes de enviar
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("Preencha todos os campos.")
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.")
      return
    }

    if (password.length < 6) {
      setErrorMessage("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    try {
      setLoading(true)

      const response = await api.post("/accounts/signin/", {
        username,
        email,
        password
      })

      const { token } = response.data

      // delega autenticação ao contexto
      login(token)

    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMessage("Usuário ou email já existente.")
      } else {
        setErrorMessage("Erro inesperado. Tente novamente.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="cadastro-container">

      <form className="cadastro-form" onSubmit={handleSubmit}>
      <h1 className="cadastro-title">Cadastro</h1>

        <div className="input-cadastro-group">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-cadastro-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-cadastro-group">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-cadastro-group">
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {errorMessage && (
          <p>
            {errorMessage}
          </p>
        )}

        <button
          className="cadastro-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? "Criando conta..." : "Cadastrar"}
        </button>
      </form>

      <p className="login-btn-redirect">
        Já tem conta? <Link to="/">
        <span className="login-box">
          Fazer login
        </span>
        </Link>
      </p>
    </div>
  )
}

export default Cadastro