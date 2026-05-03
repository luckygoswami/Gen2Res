import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '#config/variables.js';
import { tokenBlacklistModel } from '#models/blacklist.model.js';

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: 'Token not provided',
    });
  }

  const decoded = jwt.verify(token, JWT_SECRET);

  if (!decoded) {
    return res.status(400).json({
      message: 'Token invalid',
    });
  }

  const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

  if (isTokenBlacklisted) {
    return res.status(400).json({
      message: 'Token invalid',
    });
  }

  req.user = decoded;
  next();
}

export { authUser };
