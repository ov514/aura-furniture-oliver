import express from 'express';
import { registerUser, authUser, getUserProfile, getAllUsers } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.get('/users', getAllUsers); // Open endpoint for presentation demo

export default router;
