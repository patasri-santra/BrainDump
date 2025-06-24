import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    const fetchNotes = async () => {
        const res = await fetch('/api/notes');
        const data = await res.json();
        setNotes(data.data);
    };

    const handleDelete = async (id) =>{
        await fetch(`/api/notes/${id}`, {
            method: 'DELETE',
        });
        setNotes(notes.filter(note => note._id !== id));
    };  

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div id="notes-container">
  {notes.map(note => (
    <div key={note._id} className="note-card">
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <h3>{note.author}</h3>
      <div className="note-actions">
        <button onClick={() => handleDelete(note._id)}>Delete</button>
      </div>
    </div>
  ))}
</div>

    );
};

export default HomePage;
