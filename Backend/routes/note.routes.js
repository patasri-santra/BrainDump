
import express from 'express';
import { postNotes, getNotes, putNotes, deleteNotes, getNoteById } from '../controller/note.controller.js';

const router = express.Router();

router.post('', postNotes);

 router.get('', getNotes);

 router.put('/:id', putNotes);

 router.delete('/:id', deleteNotes);

router.get('/:id', getNoteById);

export default router;