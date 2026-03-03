import React, { useState, useEffect } from "react"
import { api } from "../services/api"

function Dashboard() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [taskList, setTaskList] = useState([])
  const [task, setTask] = useState(null)
  const [title_Ask, setTitle_Ask] = useState("")
  const [editingTaskId, setEditingTaskId] = useState(null)
const [editTitle, setEditTitle] = useState("")
const [editDescription, setEditDescription] = useState("")

  async function fetchTasks() {
    try {
      setLoading(true)
      const response = await api.get("/tasks/read/")
      setTaskList(response.data.tasks)
    } catch (error) {
      setErrorMessage("Erro ao buscar tarefas.")
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteTask(id) {
  try {
    await api.delete(`/tasks/${id}/delete/`)

    setTaskList((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    )
  } catch (error) {
    setErrorMessage("Erro ao deletar tarefa.")
  }
}

  function startEditing(task) {
  setEditingTaskId(task.id)
  setEditTitle(task.title)
  setEditDescription(task.description)
}

  async function handleCreateTask(e) {
    e.preventDefault()
    setErrorMessage("")

    if (!title.trim()) {
      setErrorMessage("O título é obrigatório.")
      return
    }

    try {
      setLoading(true)

      const response = await api.post("/tasks/create/", {
        title,
        description
      })

      const newTask = response.data

      setTaskList((prevTasks) => [...prevTasks, newTask])

      setTitle("")
      setDescription("")
    } catch (error) {
      setErrorMessage("Erro ao criar tarefa.")
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdateTask(id) {
  try {
    const response = await api.patch(`/tasks/${id}/update/`, {
      title: editTitle,
      description: editDescription
    })

    const updatedTask = response.data

    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? updatedTask : task
      )
    )

    setEditingTaskId(null)
  } catch (error) {
    setErrorMessage("Erro ao atualizar tarefa.")
  }
}

  function handleFindTask(e) {
    e.preventDefault()
    setErrorMessage("")

    if (!title_Ask.trim()) {
      setErrorMessage("Digite um título para buscar.")
      return
    }

    const foundTask = taskList.find(
      (t) =>
        t.title.toLowerCase() === title_Ask.trim().toLowerCase()
    )

    if (!foundTask) {
      setErrorMessage("Tarefa não encontrada.")
      setTask(null)
      return
    }

    setTask(foundTask)
  }

  useEffect(() => {
    fetchTasks()
  }, []) // IMPORTANTE: executa só uma vez

  return (
    <div style={{ padding: "40px" }}>
      <h1>Tasks:</h1>

      {/* Criar Task */}
      <form onSubmit={handleCreateTask}>
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          Criar
        </button>
      </form>

      {/* Buscar Task */}
      <form onSubmit={handleFindTask} style={{ marginTop: "30px" }}>
        <input
          type="text"
          placeholder="Buscar por título"
          value={title_Ask}
          onChange={(e) => setTitle_Ask(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Buscar
        </button>
      </form>

      {/* Resultado da busca */}
      {taskList.map((task) => (
  <div key={task.id} style={{ marginTop: "15px" }}>

    {editingTaskId === task.id ? (
      <>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <input
          type="text"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />

        <button onClick={() => handleUpdateTask(task.id)}>
          Salvar
        </button>

        <button onClick={() => setEditingTaskId(null)}>
          Cancelar
        </button>
      </>
    ) : (
      <>
        <h3>{task.title}</h3>
        <p>{task.description}</p>

        <button onClick={() => startEditing(task)}>
          Editar
        </button>

        <button onClick={() => handleDeleteTask(task.id)}>
          Deletar
        </button>
      </>
    )}

  </div>
))}
    </div>
  )
}

export default Dashboard