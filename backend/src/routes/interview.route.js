import { Router } from 'express';
import { authUser } from '#middlewares/auth.middleware.js';
import { upload } from '#middlewares/file.middleware.js';
import {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
  deleteInterviewReportController,
} from '#controllers/interview.controller.js';

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

/**
 * @route /api/interview/report/:interviewId
 * @description return interview report by interview Id
 * @access private
 */
interviewRouter.get(
  '/report/:interviewId',
  authUser,
  getInterviewReportByIdController,
);

/**
 * @route /api/interview?page={pageNumber}&limit={reportsPerPage}
 * @description return all interview reports for a logged in user
 * @access private
 */
interviewRouter.get('/', authUser, getAllInterviewReportsController);

/**
 * @route /api/interview/resume/pdf
 * @description generate tailored resume according to the user's resume content, self-description and job description
 * @access private
 */
interviewRouter.get(
  '/resume/pdf/:interviewReportId',
  authUser,
  generateResumePdfController,
);

/**
 * @route /api/interview/report/:interviewId
 * @description delete interview report by Interview ID
 * @access
 */
interviewRouter.delete(
  '/report/:interviewId',
  authUser,
  deleteInterviewReportController,
);
