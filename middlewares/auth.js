import { StatusCodes } from 'http-status-codes';
import CustomApiErrorHandler from '../utils/CustomApiErrorHandler.js';
import jwt from 'jsonwebtoken';

export const authenticatedUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new CustomApiErrorHandler('Unauthorized', StatusCodes.UNAUTHORIZED);
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    throw new CustomApiErrorHandler('Unauthorized', StatusCodes.UNAUTHORIZED);
  }
};
