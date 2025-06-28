import { useEffect, useState } from 'react';


const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [viewNote, setViewNote] = useState(null);
 

  const fetchNotes = async () => {
    const res = await fetch('/api/notes');
    const data = await res.json();
    setNotes(data.data);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    });
    setNotes(notes.filter(note => note._id !== id));
  };


  const fetchNoteById = async (id) => {
  const res = await fetch(`/api/notes/${id}`);
  const data = await res.json();
  setViewNote(data.data); // set the full note in state
};

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <div id="notes-container">
        {notes.map(note => (
          <div key={note._id} className="note-card">
            <h2>{note.title}</h2>
            <p>{note.content.slice(0, 100)}...</p>
            <h4>– {note.author}</h4>
            <div className="note-actions">
              <button onClick={() => fetchNoteById(note._id)}>View</button>
              <button onClick={() => handleDelete(note._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      
      {viewNote && (
        <div className="fullscreen-view">
          <div className="view-header">
            <button>Edit</button>
            <button onClick={() => setViewNote(null)}>Hide</button>
          </div>
          <div className="view-content">
            <h2>{viewNote.title}</h2>
            <p>{viewNote.content}</p>
            <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>– {viewNote.author}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
