import React, { useState } from "react";

export default function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);

  function saveEdit() {
    if (text.trim() !== "") {
      onEdit(task.id, text);
      setEditing(false);
    }
  }

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {editing ? (
        <input
          className="edit-input"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && saveEdit()}
        />
      ) : (
        <span onDoubleClick={() => setEditing(true)}>{task.text}</span>
      )}

      {editing ? (
        <button onClick={saveEdit}>Save</button>
      ) : (
        <button onClick={() => onDelete(task.id)}>Delete</button>
      )}
    </div>
  );
}
