import express from 'express';
import { createOrder, getOrders, exportOrders } from '../controllers/orderController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/', createOrder);
router.get('/', authMiddleware, adminMiddleware, getOrders);
router.get('/export', authMiddleware, adminMiddleware, exportOrders);

export default router;