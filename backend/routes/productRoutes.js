import express from 'express';
import { protect, isProvider } from '../middleware/authMiddleware.js';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import { getRemarkByProductId } from '../controllers/remarkController.js';

const router = express.Router();

router.post('/', protect, isProvider, createProduct);
router.get('/', protect, getAllProducts);
router.get('/:id', protect, getProductById);
router.put('/:id', protect, isProvider, updateProduct);
router.delete('/:id', protect, isProvider, deleteProduct);
router.get('/:id/remarks', isProvider, protect, getRemarkByProductId);

export default router;
