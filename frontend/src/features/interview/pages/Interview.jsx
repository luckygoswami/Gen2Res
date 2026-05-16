import React from 'react';
import { useInterview } from '@/features/interview';

export function Interview() {
  const { loading, report, getResumePdf } = useInterview();

  if (loading || !report) {
    return <main>Report Loading...</main>;
  }

  return (
    <div>
      <h1>{report.title}</h1>
      <button onClick={() => getResumePdf({ download: true })}>
        Download Resume
      </button>
      <button onClick={getResumePdf}>View Resume</button>
    </div>
  );
}
