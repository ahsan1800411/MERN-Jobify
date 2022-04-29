import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import CustomApiErrorHandler from '../utils/CustomApiErrorHandler.js';

export const register = async (req, res) => {
  const { name, password, email } = req.body;
  if (!email || !password || !name) {
    throw new CustomApiErrorHandler(
      'Please provide all the values!!',
      StatusCodes.BAD_REQUEST
    );
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new CustomApiErrorHandler(
      'User with this email already exists',
      StatusCodes.BAD_REQUEST
    );
  }
  const user = await User.create({ email, password, name });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      location: user.location,
      lastName: user.lastName,
    },
    token,
    location: user.location,
  });
};

export const login = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    throw new CustomApiErrorHandler(
      'Please provide all the values!!',
      StatusCodes.BAD_REQUEST
    );
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new CustomApiErrorHandler(
      'Invalid Credentials',
      StatusCodes.BAD_REQUEST
    );
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new CustomApiErrorHandler(
      'Invalid Credentials',
      StatusCodes.BAD_REQUEST
    );
  }

  const token = user.createJWT();

  user.password = undefined;
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};
export const updatedUser = async (req, res) => {
  const { name, lastName, location, email } = req.body;
  if (!email || !lastName || !name || !location) {
    throw new CustomApiErrorHandler(
      'Please provide all the values!!',
      StatusCodes.BAD_REQUEST
    );
  }
  const user = await User.findOne({ _id: req.user.id });

  user.name = name;
  user.email = email;
  user.location = location;
  user.lastName = lastName;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};
