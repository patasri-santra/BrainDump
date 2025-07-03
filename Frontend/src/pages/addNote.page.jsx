import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddNote() {
  const [form, setForm] = useState({ title: '', content: '', author: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setForm({ title: '', content: '', author: '' });
    alert("Note added!");
    navigate('/home'); // Navigate to home page after adding note
  };

  return (
    <div id="add-note-container">
      <form id="add-note-form" onSubmit={handleSubmit}>
        <h2>Add a New Note</h2>

        <label>Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter note title"
          required
        />

        <label>Content</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Enter note content"
          rows="4"
          required
        />

        <label>Author</label>
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />

        <button type="submit">Add Note</button>
      </form>
    </div>
  );
}

export default AddNote;