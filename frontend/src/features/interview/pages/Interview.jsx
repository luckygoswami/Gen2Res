import React from 'react';
import { useInterview } from '@/features/interview';

export function Interview() {
  const { loading, report } = useInterview();

  if (loading || !report) {
    return <main>Report Loading...</main>;
  }

  return (
    <div>
      <h1>{report.title}</h1>
    </div>
  );
}
