import { useEffect, useState } from 'react';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [viewNote, setViewNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

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
    setIsEditing(false); // reset editing mode when viewing a note
  };

  // Handle edit button click
  const handleEdit = () => {
    setEditTitle(viewNote.title);
    setEditContent(viewNote.content);
    setIsEditing(true);
  };

  // Handle save after editing
  const handleSave = async () => {
    await fetch(`/api/notes/${viewNote._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, content: editContent }),
    });
    setViewNote({ ...viewNote, title: editTitle, content: editContent });
    setNotes(notes.map(note =>
      note._id === viewNote._id ? { ...note, title: editTitle, content: editContent } : note
    ));
    setIsEditing(false);
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
            {!isEditing ? (
              <>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={() => setViewNote(null)}>Hide</button>
              </>
            ) : (
              <>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </>
            )}
          </div>
          <div className="view-content">
            {!isEditing ? (
              <>
                <h2>{viewNote.title}</h2>
                <p>{viewNote.content}</p>
                <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>– {viewNote.author}</p>
              </>
            ) : (
              <>
                <input
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  style={{ width: '100%', fontSize: '1.5rem', marginBottom: '1rem' }}
                />
                <textarea
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  style={{ width: '100%', minHeight: '120px' }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;