import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email address',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    select: false,
    minlength: 3,
  },
  lastName: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 20,
    default: 'Last Name',
  },
  location: {
    type: String,
    trim: true,
    default: 'my city',
  },
});

//  hash the password;

UserModel.pre('save', async function () {
  // console.log(this.modifiedPaths());
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserModel.methods.createJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFE_TIME,
  });
};

// compare password>>
UserModel.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', UserModel);
