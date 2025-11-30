import React, { useState } from "react";

export default function TaskForm({ onSave, initial = {} }) {
  const [title, setTitle] = useState(initial.title || "");
  const [description, setDescription] = useState(initial.description || "");
  const [completed, setCompleted] = useState(initial.completed || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, completed });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>
        Completed:
        <input
          type="checkbox"
          checked={completed}
          onChange={() => setCompleted((c) => !c)}
        />
      </label>
      <button type="submit">Save Task</button>
    </form>
  );
}
