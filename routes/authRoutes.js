import express from 'express';
import {
  login,
  register,
  updatedUser,
} from '../controllers/authControllers.js';
import { authenticatedUser } from '../middlewares/auth.js';
import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

const router = express.Router();

router.route('/login').post(apiLimiter, login);
router.route('/register').post(apiLimiter, register);
router.route('/updatedUser').patch(authenticatedUser, updatedUser);

export default router;
