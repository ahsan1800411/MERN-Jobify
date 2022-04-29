import { StatusCodes } from 'http-status-codes';
import CustomApiErrorHandler from './CustomApiErrorHandler.js';

export const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.id === resourceUserId.toString()) return;
  throw new CustomApiErrorHandler(
    'Not allowed to access this route',
    StatusCodes.UNAUTHORIZED
  );
};
