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
