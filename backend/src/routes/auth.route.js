import {
  loginUserController,
  registerUserController,
} from '#controllers/auth.controller.js';
import { Router } from 'express';

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access public
 */
authRouter.post('/register', registerUserController);

/**
 * @route POST /api/auth/login
 * @description login user with given email and password
 * @access public
 */
authRouter.post('/login', loginUserController);

export { authRouter };
