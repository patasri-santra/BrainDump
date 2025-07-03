// Backend/routes/user.routes.js
import express from 'express';
import { loginUser, registerUser} from '../controller/user.controller.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);

export default router;
