import express from 'express';
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/users/me', authMiddleware, UserController.getCurrentUser);

export default router;