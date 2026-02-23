import React from "react"

function Dashboard() {
    const token = localStorage.getItem('token')
  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>
      <p>Você está autenticado 😎</p>
      <p>{token}</p>
    </div>
  )
}

export default Dashboard