
import express from 'express';
import { postNotes, getNotes, putNotes, deleteNotes } from '../controller/note.controller.js';

const router = express.Router();

router.post('', postNotes);

 router.get('', getNotes);

 router.put('/:id', putNotes);

 router.delete('/:id', deleteNotes);

export default router;