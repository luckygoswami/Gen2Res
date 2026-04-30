import { registerUserController } from '#controllers/auth.controller.js';
import { Router } from 'express';

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post('/register', registerUserController);

export { authRouter };
