import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userModel } from '#models/user.model.js';
import { tokenBlacklistModel } from '#models/blacklist.model.js';
import { GOOGLE_CLIENT_ID, JWT_SECRET } from '#config/variables.js';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

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

/**
 * @name getMeController
 * @description get the current logged in user's details
 * @access private
 */
async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id);

  return res.status(200).json({
    message: 'User details fetched successfully',
    user,
  });
}

/**
 * @name socialLoginController
 * @description register and login the user with given Google account
 * @access public
 */
async function socialLoginController(req, res) {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({
      message: 'Token not found',
    });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
    });

    const payload = ticket.getPayload();
    const { name, email, sub } = payload;

    const user = await userModel.findOne({ email });

    if (!user) {
      const newUser = await userModel.create({
        username: `${name.replaceAll(' ', '')}${email.split('@')[0]}_${sub.slice(0, 5)}`,
        email,
        password: undefined,
        providers: {
          local: false,
          google: true,
        },
        googleId: sub,
      });

      console.log(newUser);
      // Store JWT in cookie (consider httpOnly + secure in production)
      const jwtToken = jwt.sign(
        { id: newUser._id, username: newUser.username },
        JWT_SECRET,
        {
          expiresIn: '1d',
        },
      );

      res.cookie('token', jwtToken);

      return res.status(200).json({
        message: 'User logged in successfully',
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    }

    // Store JWT in cookie (consider httpOnly + secure in production)
    const jwtToken = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: '1d',
      },
    );

    res.cookie('token', jwtToken);

    return res.status(200).json({
      message: 'User logged in successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: 'Unable to sign in via Google',
    });
  }
}

export {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
  socialLoginController,
};
