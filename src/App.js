import React, { useEffect, useState } from "react";
import "./App.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Load from Local Storage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  // Save to Local Storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, category) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text,
        category,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const toggleTask = (id) =>
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const editTask = (id, newText) =>
    setTasks(tasks.map(t => t.id === id ? { ...t, text: newText } : t));

  const filteredTasks = tasks.filter(t =>
    filter === "completed" ? t.completed :
    filter === "active" ? !t.completed : true
  );

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <TaskInput onAdd={addTask} />

      <div className="filters">
        {["all","active","completed"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={filter===f?"active":""}>
            {f}
          </button>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={editTask}
      />
    </div>
  );
}
