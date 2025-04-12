import express from 'express';
import { protect, isProvider } from '../middleware/authMiddleware.js';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/', protect, isProvider, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', protect, isProvider, updateProduct);
router.delete('/:id', protect, isProvider, deleteProduct);

export default router;
