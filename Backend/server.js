

//const express = require('express');
 import express from 'express';
 import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import noteRoutes from './routes/note.routes.js';

 dotenv.config();
const PORT = process.env.PORT || 3000;
 const app = express();
  app.use(express.json()); // allow us to accept JSON data in req.body
  app.use("/api/notes", noteRoutes); // use the note routes(use the prefix /api/notes for all note routes in note.routes.js)


 app.listen(PORT, () => {
  connectDB();
   console.log(`Server is running on http://localhost:${PORT} `);
 });

 