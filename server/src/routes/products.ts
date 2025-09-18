import express from 'express';
import { 
  getProducts, 
  getProductsByCategory, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/', getProducts);
router.get('/category/:categoryId', getProductsByCategory);
router.post('/', authMiddleware, adminMiddleware, createProduct);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

export default router;