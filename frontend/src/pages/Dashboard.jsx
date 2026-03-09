import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { api } from "../services/api"
import "./Dashboard.css"

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
  const { logout } = useContext(AuthContext)


function startEditing(task) {
setEditingTaskId(task.id)
setEditTitle(task.title)
setEditDescription(task.description)
}

  async function fetchTasks() {
    try {

      const response = await api.get("tasks/read/")
      console.log("Tasks recebidas:", response.data)
      
      setTaskList(response.data.tasks)

    } catch (error) {
      setErrorMessage("Erro ao buscar tarefas.")
    }
  }

  async function handleCreateTask(e) {
    e.preventDefault()
    setErrorMessage("")
  
    if (!title.trim()) {
      setErrorMessage("O título é obrigatório.")
      return
    }
  
    try {
      await api.post("/tasks/create/", {
        title,
        description
      })
  
      await fetchTasks() 
  
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
      await api.patch(`/tasks/${id}/update/`, {
        title: editTitle,
        description: editDescription
      })
  
      await fetchTasks()
  
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
  
  async function handleDeleteTask(id) {
  try {
    await api.delete(`/tasks/${id}/delete/`)
    
    await fetchTasks()

  } catch (error) {
    setErrorMessage("Erro ao deletar tarefa.")
  }
}

  useEffect(() => {
    fetchTasks()
  }, []) // IMPORTANTE: executa só uma vez

  return (
    <div className="dashboard-container">
      
      <h1 className="dashboard-title">TaskFlow</h1>
      
      <section className="create-task">
        <form onSubmit={handleCreateTask}>
           
          <h2>Criar tarefa</h2>

          <input 
          className="dashboard-input"
          type="text"
          placeholder="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />

          <input 
          className="dashboard-input"
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />

          <button 
          className="dashboard-btn"
          type="submit" disabled={loading}>
            Criar
          </button>

        </form>
      </section>

      <section className="search-task">
        <form onSubmit={handleFindTask}>
          <input 
          className="dashboard-input"
          type="text"
          placeholder="Buscar tarefa"
          value={title_Ask}
          onChange={(e) => setTitle_Ask(e.target.value)}
          />
          
          <button 
          className="dashboard-btn"
          type="submit">
            Buscar
          </button>

        </form>
      </section>

      <section className="task-list">
        {taskList.map((task) => (
          <div className="task-card" key={task.id}>

            {editingTaskId === task.id? (
              <>

              <input 
              className="dashboard-input"
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)} 
              />

              <input 
              className="dashboard-input"
              type="text"
              value={editDescription}
              onChange={(e) => 
                setEditDescription(e.target.value)}
              />

              <button 
              className="dashboard-btn"
              onClick={() => handleUpdateTask(task.id)}>
                Salvar
              </button>

              <button 
              className="dashboard-btn"
              onClick={() => setEditingTaskId(null)}>
                Cancelar
              </button>

              </>
            ) : (
              <>
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <button 
              className="dashboard-btn"
              onClick={() => startEditing(task)}>
                Editar
              </button>

              <button 
              className="dashboard-btn"
              onClick={() => 
              handleDeleteTask(task.id)}>
                Deletar
              </button>
              </>
            )}
          </div>
        ))}

      </section>

      <button 
      className="logout-btn"
      onClick={logout}
      >
       Logout 
      </button>
    </div>
  )
}

export default Dashboard