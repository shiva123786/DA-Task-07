import React, { useState } from "react";

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState("");

  function handleAdd() {
    if (text.trim() === "") return;
    onAdd(text);
    setText("");
  }

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Enter your task..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleAdd()}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
