import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { api } from "../services/api"
import { AuthContext } from "../context/AuthContext"

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

      const { access_token } = response.data

      // delega autenticação ao contexto
      login(access_token)

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
    <div style={{ padding: "40px" }}>
      <h1>Cadastro</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {errorMessage && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          style={{ marginTop: "15px" }}
          disabled={loading}
        >
          {loading ? "Criando conta..." : "Cadastrar"}
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>
        Já tem conta? <Link to="/">Fazer login</Link>
      </p>
    </div>
  )
}

export default Cadastro