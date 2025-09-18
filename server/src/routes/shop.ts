import express from 'express';
import { getShop, updateShop } from '../controllers/shopController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/', getShop);
router.put('/', authMiddleware, adminMiddleware, updateShop);

export default router;