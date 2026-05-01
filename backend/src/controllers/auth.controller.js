import userModel from '#models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { tokenBlacklistModel } from '#models/blacklist.model.js';
import { JWT_SECRET } from '#config/variables.js';

/**
 * @name registerUserController
 * @description Register a new user using username, email and password
 * @access public
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: 'Please provide username, email and password',
    });
  }

  // Prevent duplicate accounts (username OR email must be unique)
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: 'Account already exists with this username or email address',
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  // Store JWT in cookie (consider httpOnly + secure in production)
  const token = jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: '1d',
    },
  );

  res.cookie('token', token);

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @name loginUserController
 * @description login user with given email and password
 * @access public
 */
async function loginUserController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: 'Invalid email and password',
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: 'Invalid email or password',
    });
  }

  // Store JWT in cookie (consider httpOnly + secure in production)
  const token = jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: '1d',
    },
  );

  res.cookie('token', token);

  res.status(200).json({
    message: 'User logged in successfully',
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @name logoutUserController
 * @description clear token cookie and add it to the blacklist
 * @access public
 */
async function logoutUserController(req, res) {
  const token = req.cookies.token;

  if (token) {
    await tokenBlacklistModel.create({ token });
  }

  res.clearCookie('token');

  return res.status(200).json({
    message: 'User logged out successfully',
  });
}

export { registerUserController, loginUserController, logoutUserController };
