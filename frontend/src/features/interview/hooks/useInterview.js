import { useContext, useEffect } from 'react';
import {
  InterviewContext,
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
  generateResumePdf,
  deleteInterviewReportById,
} from '@/features/interview';
import { useParams } from 'react-router';

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;
  const { interviewId } = useParams();

  const generateReport = async ({
    resumeFile,
    selfDescription,
    jobDescription,
  }) => {
    setLoading(true);
    let report = null;

    try {
      report = await generateInterviewReport({
        resumeFile,
        selfDescription,
        jobDescription,
      });

      setReport(report.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    return report.data;
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    let report = null;

    try {
      report = await getInterviewReportById(interviewId);
      setReport(report);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    return report;
  };

  const getReports = async ({
    page = 1,
    limit = 5,
    pagination = false,
  } = {}) => {
    setLoading(true);
    var reports = [];

    try {
      var { interviewReports: reports, pagination } =
        await getAllInterviewReports({ page, limit });
      setReports(reports);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    if (pagination)
      return {
        reports,
        pagination,
      };

    return reports;
  };

  const getResumePdf = async ({ download = false }) => {
    setLoading(true);

    try {
      const blob = await generateResumePdf(interviewId);
      const url = URL.createObjectURL(blob);

      if (!download) {
        window.open(url, '_blank');
      } else {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `resume_${interviewId}.pdf`);
        document.body.appendChild(link);
        link.click();
      }

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 10000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (interviewId) => {
    setLoading(true);
    try {
      await deleteInterviewReportById(interviewId);

      setReports((prev) => prev.filter((rep) => rep._id !== interviewId));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReports();
    }
  }, [interviewId]);

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
    deleteReport,
  };
};
