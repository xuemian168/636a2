import express from 'express';
import { protect, isProvider, isAdmin } from '../middleware/authMiddleware.js';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import { getRemarkByProductId } from '../controllers/remarkController.js';

const router = express.Router();

router.post('/', protect, isAdmin, createProduct);
router.get('/', protect, getAllProducts);
router.get('/:id', protect, getProductById);
router.put('/:id', protect, isAdmin, updateProduct);
router.delete('/:id', protect, isAdmin, deleteProduct);
router.get('/:id/remarks', isAdmin, protect, getRemarkByProductId);

export default router;  