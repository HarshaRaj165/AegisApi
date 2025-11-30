import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import TaskForm from "./TaskForm";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState("");
  const [role, setRole] = useState("user");

  // Fetch tasks (if admin gets all, otherwise only own)
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return setTasks([]);
      // decode to get role
      const { role } = JSON.parse(atob(token.split('.')[1]));
      setRole(role);
      if (role === "admin") {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } else {
        // get own tasks as non-admin (show by filtering after fetching all owned via backend or by listing all and filtering)
        const res = await api.get("/tasks");
        setTasks(res.data.filter((t) => t.owner?.role !== 'admin'));
      }
    } catch {
      setTasks([]);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async (data) => {
    try {
      await api.post("/tasks", data);
      setMsg("Task added!");
      fetchTasks();
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  const saveEdit = async (data) => {
    try {
      await api.put(`/tasks/${editing.id}`, data);
      setEditing(null);
      fetchTasks();
      setMsg("Task updated!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Update failed");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setMsg(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => { localStorage.clear(); window.location.reload(); }}>Logout</button>
      <div>{msg}</div>
      <TaskForm onSave={addTask} />
      <hr />
      <h3>Your Tasks:</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <b>{task.title}</b> - {task.completed ? "✅" : "❌"}<br />
            {task.description}<br />
            <button onClick={() => setEditing(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            {editing && editing.id === task.id && (
              <TaskForm initial={task} onSave={saveEdit} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
