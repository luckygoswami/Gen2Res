import { useContext, useEffect } from 'react';
import {
  InterviewContext,
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
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

    try {
      const report = await generateInterviewReport({
        resumeFile,
        selfDescription,
        jobDescription,
      });
      setReport(report);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    return report;
  };

  const getReportById = async (interviewId) => {
    setLoading(true);

    try {
      const report = await getInterviewReportById(interviewId);
      setReport(report);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    return report;
  };

  const getReports = async () => {
    setLoading(true);

    try {
      const reports = await getAllInterviewReports();
      setReports(reports);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    return reports;
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
  };
};
