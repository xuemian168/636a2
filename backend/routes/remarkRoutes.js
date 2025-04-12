import express from 'express';
import { protect, isSeller } from '../middleware/authMiddleware.js';
import { createRemark, getAllRemarks, getRemarkById, updateRemark, deleteRemark } from '../controllers/remarkController.js';
const router = express.Router();

router.post('/', protect, isSeller, createRemark);
router.get('/', protect, getAllRemarks);
router.get('/:id', protect, getRemarkById);
router.put('/:id', protect, isSeller, updateRemark);
router.delete('/:id', protect, isSeller, deleteRemark);

export default router;