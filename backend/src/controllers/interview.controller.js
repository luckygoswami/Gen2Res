import { PDFParse, VerbosityLevel } from 'pdf-parse';
import { generateInterviewReport } from '#services/ai.service.js';
import { interviewReportModel } from '#models/interviewReport.model.js';

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
export async function generateInterviewReportController(req, res) {
  const file = req.file;

  const resume = (
    await new PDFParse({
      verbosity: VerbosityLevel.ERRORS,
      data: file.buffer,
    }).getText()
  ).text;
  const { selfDescription, jobDescription } = req.body;

  try {
    const interviewReportByAi = await generateInterviewReport({
      resume,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
    });

    return res.status(201).json({
      message: 'Interview Report generated successfully',
      data: interviewReport,
    });
  } catch (err) {
    console.log(err);
    return res.status(501).json({
      message: 'Error while generating interview report',
    });
  }
}
