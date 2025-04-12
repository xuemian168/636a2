import express from 'express';
import { protect, isSeller } from '../middleware/authMiddleware';
import Remark from '../models/Remark';

const router = express.Router();

router.post('/', protect, isSeller, createRemark);
router.get('/', getAllRemarks);
router.get('/:id', getRemarkById);
router.put('/:id', protect, isSeller, updateRemark);
router.delete('/:id', protect, isSeller, deleteRemark);

export default router;