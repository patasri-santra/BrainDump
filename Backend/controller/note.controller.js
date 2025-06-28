import mongoose from "mongoose";
import Note from "../model/note.model.js";
import User from "../model/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


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

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({ data: note });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, user: { name: user.name } });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const registerUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const existing = await User.findOne({ name });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, password: hashed });

    res.status(201).json({ message: "User created", user: { name: user.name } });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};
