import React, { useState } from 'react';
import { useInterview } from '@/features/interview';
import { useNavigate } from 'react-router';

export function Home() {
  const { reports, generateReport } = useInterview();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const report = await generateReport({
        resumeFile,
        selfDescription,
        jobDescription,
      });

      navigate(`interview/${report._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const [resumeFile, setResumeFile] = useState(null);
  const [selfDescription, setSelfDescription] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="resume">Resume</label>
          <input
            type="file"
            accept="application/pdf"
            name="resume"
            id="resume"
            onChange={(e) => setResumeFile(e.target.files[0])}
          />
        </div>

        <div className="input-group">
          <label htmlFor="self-description">Self Description</label>
          <input
            type="text"
            name="self-description"
            id="self-description"
            onChange={(e) => setSelfDescription(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="job-description">Job Description</label>
          <input
            type="text"
            name="job-description"
            id="job-description"
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <button type="submit">Upload</button>
      </form>

      <section className="all-reports">
        {reports.map((rep) => (
          <div
            key={rep._id}
            onClick={() => navigate(`interview/${rep._id}`)}>
            {rep.title}
          </div>
        ))}
      </section>
    </main>
  );
}
