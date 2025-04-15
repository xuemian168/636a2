import express from 'express';
import { registerUser, loginUser, updateUserProfile, getProfile, logoutUser, getAllUsers, deleteUser, updateUser } from '../controllers/authController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/logout', protect, logoutUser);
router.get('/users', protect, isAdmin, getAllUsers);
router.delete('/users/:id', protect, isAdmin, deleteUser);
router.put('/users/:id', protect, isAdmin, updateUser);

export default router;
