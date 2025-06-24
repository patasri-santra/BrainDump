import mongoose from "mongoose";
import Note from "../model/note.model.js";


export const postNotes = async(req, res) => {
  const note = req.body;
  // Here you would typically save the note to the database
  if(!note.title || !note.content || !note.author) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const newNote = new Note(note);

  try{
    await newNote.save();
    res.status(201).json({ success: true, data: newNote });
  }catch(error){
    console.error("Error saving note:", error.message);
    res.status(500).json({ message: 'Internal server error' }); 
  }
 }

 export const getNotes = async(req,res) =>{

   try {
     const notes = await Note.find().sort({ createdAt: -1 });  // Fetch all notes and sort them by creation date in descending order
     res.status(200).json({ success: true, data: notes });
   } catch (error) {
     console.error("Error fetching notes:", error.message);
     res.status(500).json({ message: 'Internal server error' });
   }
 }

  export const putNotes = async(req, res) => {
  const {id} = req.params;
  const updatedNote = req.body;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid note ID' });
  }
try {
  const note = await Note.findByIdAndUpdate(id, updatedNote, { new: true });
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }
  res.status(200).json({ success: true, data: note });
} catch (error) {
  console.error("Error updating note:", error.message);
  res.status(500).json({ message: 'Internal server error' });
}
}

export const deleteNotes = async(req, res) => {
  const {id} = req.params;
  try {
    await Note.findByIdAndDelete(id);
    res.status(204).json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    console.error("Error deleting note:", error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}
