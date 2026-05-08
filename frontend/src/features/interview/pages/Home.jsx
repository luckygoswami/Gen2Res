import React from 'react';
import { useState } from 'react';
import { generateInterviewReport } from '@/features/interview';

export function Home() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await generateInterviewReport({
        resumeFile,
        selfDescription,
        jobDescription,
      });

      console.log(res);
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
    </main>
  );
}
