import {
  getMeController,
  loginUserController,
  logoutUserController,
  registerUserController,
  socialLoginController,
} from '#controllers/auth.controller.js';
import { authUser } from '#middlewares/auth.middleware.js';
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

/**
 * @route GET /api/auth/logout
 * @description logout user and clear token from cookies
 * @access private
 */
authRouter.get('/logout', logoutUserController);

//  craete a get-me route that will first check if the token is blacklisted or not and then return the user details
/**
 * @route GET /api/auth/get-me
 * @description authenticate user from token in request and return user details in response
 * @access private
 */
authRouter.get('/get-me', authUser, getMeController);

/**
 * @route POST /api/auth/google
 * @description authenticate user with social login credentials and return user details in reponse
 * @access public
 */
authRouter.post('/google', socialLoginController);

export { authRouter };
