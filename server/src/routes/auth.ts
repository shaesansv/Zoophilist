import express from 'express';
import { login, createInitialAdmin } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.post('/create-initial-admin', createInitialAdmin);

export default router;