import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import noteRoutes from './routes/note.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Accept JSON payloads

// Mount routes
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

// Connect DB and then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to connect to database:", err.message);
});
