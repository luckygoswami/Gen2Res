import { PDFParse, VerbosityLevel } from 'pdf-parse';
import {
  generateInterviewReport,
  generateResumePdf,
} from '#services/ai.service.js';
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
    return res.status(501).json({
      message: 'Error while generating interview report',
    });
  }
}

/**
 * @description Controller to fetch interview report by Interview ID
 * @access private
 */
export const getInterviewReportByIdController = async (req, res) => {
  const { interviewId } = req.params;

  try {
    const interviewReport = await interviewReportModel.findOne({
      _id: interviewId,
      user: req.user.id,
    });

    if (!interviewReport) {
      return res.status(404).json({
        message: 'Interview Report not found!',
      });
    }

    return res.status(200).json({
      message: 'Interview Report successfully fetched',
      interviewReport,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

/**
 * @description Controller to get all interview reports of logged in user
 * @access private
 */
export const getAllInterviewReportsController = async (req, res) => {
  const page = Math.max(req.query.page || 1, 1);

  const limit = Math.min(req.query.limit || 20, 100);

  const skip = (page - 1) * limit;

  try {
    const [reports, total] = await Promise.all([
      interviewReportModel
        .find({ user: req.user.id }, 'title matchScore createdAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      interviewReportModel.countDocuments(),
    ]);

    if (!reports) {
      return res.status(404).json({
        message: 'No reports found!',
      });
    }

    return res.status(200).json({
      message: 'Successfully fetched reports',
      interviewReports: reports,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

/**
 * @description Controller to get tailored resume PDF
 * @access private
 */
export const generateResumePdfController = async (req, res) => {
  const { interviewReportId } = req.params;

  const interviewReport =
    await interviewReportModel.findById(interviewReportId);

  if (!interviewReport) {
    return res.status(404).json({
      message: 'Interview Report not found.',
    });
  }

  const { resume, selfDescription, jobDescription } = interviewReport;

  try {
    const pdfBuffer = await generateResumePdf({
      resume,
      selfDescription,
      jobDescription,
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=resume_${interviewReportId}.pdf`,
    });

    return res.send(pdfBuffer);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
