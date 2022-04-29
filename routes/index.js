import express from 'express';
import { authenticatedUser } from '../middlewares/auth.js';
import authRoutes from './authRoutes.js';
import jobsRoutes from './jobsRoutes.js';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/jobs', authenticatedUser, jobsRoutes);

export default router;
