import express from 'express';
import { protect, isProvider } from '../middleware/authMiddleware';
import Product from '../models/Product';

const router = express.Router();

router.post('/', protect, isProvider, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', protect, isProvider, updateProduct);
router.delete('/:id', protect, isProvider, deleteProduct);
