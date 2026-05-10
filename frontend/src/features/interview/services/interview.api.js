import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_FRONTEND_URL}/api/interview`,
  withCredentials: true,
});

/**
 * @description Service to generate interview report based on user self description, resume and job description.
 */
export const generateInterviewReport = async ({
  resumeFile,
  selfDescription,
  jobDescription,
}) => {
  const formData = new FormData();
  formData.append('resume', resumeFile);
  formData.append('selfDescription', selfDescription);
  formData.append('jobDescription', jobDescription);

  try {
    const res = await api.post('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

/**
 * @description service to fetch interview report based on interview Id
 * @access private
 */
export const getInterviewReportById = async (interviewId) => {
  try {
    const { interviewReport } = (await api.get(`/report/${interviewId}`)).data;

    return interviewReport;
  } catch (err) {
    console.log(err);
  }
};

/**
 * @description service to get all interview reports of a logged in user
 * @access private
 */
export const getAllInterviewReports = async () => {
  try {
    const { interviewReports } = (await api.get('/')).data;

    return interviewReports;
  } catch (err) {
    console.log(err);
  }
};
