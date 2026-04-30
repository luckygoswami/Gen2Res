import userModel from '#models/user.model.js';
import bcrypt from 'bcryptjs';
import sign from 'jsonwebtoken';

/**
 * @name registerUserController
 * @description Register a new user using username, email and password
 * @access Public
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
  const token = sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
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

export { registerUserController };
