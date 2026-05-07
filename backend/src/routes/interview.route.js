import { Router } from 'express';
import { authUser } from '#middlewares/auth.middleware.js';
import { upload } from '#middlewares/file.middleware.js';
import { generateInterviewReportController } from '#controllers/interview.controller.js';

export const interviewRouter = Router();

/**
 * @route POST /api/interview
 * @description generate an interview report on the basis of provided resume, self-description and job description
 * @access private
 */
interviewRouter.post(
  '/',
  authUser,
  upload.single('resume'),
  generateInterviewReportController,
);
