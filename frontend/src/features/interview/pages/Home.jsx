import React, { useState } from 'react';
import { useInterview } from '@/features/interview';
import { useNavigate } from 'react-router';
import { TopNavbar, Sidebar, BottomNavbar } from '@/components';
import { useRef } from 'react';

export function Home() {
  const [resumeFile, setResumeFile] = useState(null);
  const [selfDescription, setSelfDescription] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const { generateReport } = useInterview();
  const navigate = useNavigate();
  const resumeFileRef = useRef(null);

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

  return (
    <>
      <Sidebar />
      <TopNavbar />
      {/* Main Content Area */}
      <main className="pt-24 pb-24 md:pb-12 px-margin_mobile md:px-margin_desktop ml-0 md:ml-sidebar_width min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="mb-stack_md md:mb-stack_lg">
            <h2 className="font-display-lg text-on-surface text-headline-lg-mobile md:text-display-lg">
              Intelligence Generator
            </h2>
            <p className="text-body-lg text-on-surface-variant mt-2">
              Upload data to generate an AI-powered interview assessment report.
            </p>
          </div>
          {/* Centralized Report Creation Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 md:p-stack_lg border-b border-outline-variant/30 bg-surface-container-low/50">
              <h3 className="text-headline-sm font-headline-sm text-on-surface">
                Create New Report
              </h3>
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-4 md:p-stack_lg space-y-stack_lg md:space-y-gutter">
              {/* Step 1: Resume Upload */}
              <div className="space-y-stack_sm">
                <label className="text-label-md font-label-md text-on-surface flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                    01
                  </span>
                  Resume
                </label>
                <label
                  htmlFor="resume"
                  className="relative group">
                  <div className="border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-surface-container-lowest hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <span
                        className="material-symbols-outlined text-3xl"
                        data-icon="upload_file">
                        upload_file
                      </span>
                    </div>
                    {resumeFile ?
                      <div className="text-center">
                        <p className="text-body-md font-semibold text-on-surface">
                          {resumeFile.name}
                        </p>
                      </div>
                    : <div className="text-center">
                        <p className="text-body-md font-semibold text-on-surface">
                          Drop your resume here
                        </p>
                        <p className="text-label-md text-outline">
                          Supports PDF, DOCX (Max 10MB)
                        </p>
                      </div>
                    }
                    <label
                      htmlFor="resume"
                      className="mt-2 px-4 py-2 border border-outline-variant rounded-lg text-label-md font-semibold hover:bg-surface hover:text-primary transition-colors">
                      {resumeFile ? 'Select other file' : 'Browse Files'}
                    </label>
                    <input
                      ref={resumeFileRef}
                      onChange={() =>
                        setResumeFile(resumeFileRef.current.files[0])
                      }
                      hidden
                      type="file"
                      accept="application/pdf"
                      name="resume"
                      id="resume"
                    />
                  </div>
                </label>
              </div>
              {/* Step 2: Self Description */}
              <div className="space-y-stack_sm">
                <label
                  htmlFor="self-description"
                  className="text-label-md font-label-md text-on-surface flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                    02
                  </span>
                  Self Description
                </label>
                <textarea
                  id="self-description"
                  className="w-full h-32 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                  placeholder="Paste the self-summary or initial screening notes here..."
                  onChange={(e) =>
                    setSelfDescription(e.target.value)
                  }></textarea>
              </div>
              {/* Step 3: Job Description */}
              <div className="space-y-stack_sm">
                <label
                  htmlFor="job-description"
                  className="text-label-md font-label-md text-on-surface flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                    03
                  </span>
                  Job Description
                </label>
                <textarea
                  id="job-description"
                  className="w-full h-48 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                  placeholder="Paste the job requirements and role responsibilities..."
                  onChange={(e) =>
                    setJobDescription(e.target.value)
                  }></textarea>
              </div>
              {/* Action Section */}
              <div className="pt-stack_md">
                <button
                  className="w-full py-3 md:py-4 bg-primary text-on-primary rounded-xl flex items-center justify-center gap-3 hover:opacity-90 active:scale-[0.99] transition-all shadow-lg shadow-primary/20"
                  type="submit">
                  <span
                    className="material-symbols-outlined"
                    data-icon="auto_awesome"
                    data-weight="fill">
                    auto_awesome
                  </span>
                  <span className="text-body-lg font-semibold tracking-wide">
                    Generate Interview Report
                  </span>
                </button>
                <p className="text-center text-label-md text-outline mt-4 italic">
                  Powered by Gen2Res AI Proprietary Analysis Engine
                </p>
              </div>
            </form>
          </div>
          {/* Decorative Visual/Quick Insights Grid */}
          <div className="mt-stack_lg grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="bg-surface-container-low p-stack_md rounded-xl border border-outline-variant/30 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-tertiary-container/10 text-tertiary-container flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined"
                  data-icon="psychology">
                  psychology
                </span>
              </div>
              <div>
                <h4 className="text-label-md font-bold text-on-surface">
                  Behavioral Analysis
                </h4>
                <p className="text-label-sm text-on-surface-variant mt-1">
                  Deep patterns detected from past screenings.
                </p>
              </div>
            </div>
            <div className="bg-surface-container-low p-stack_md rounded-xl border border-outline-variant/30 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary-container/20 text-on-secondary-fixed-variant flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined"
                  data-icon="assignment_turned_in">
                  assignment_turned_in
                </span>
              </div>
              <div>
                <h4 className="text-label-md font-bold text-on-surface">
                  Skill Mapping
                </h4>
                <p className="text-label-sm text-on-surface-variant mt-1">
                  Direct correlation with JD requirements.
                </p>
              </div>
            </div>
            <div className="bg-surface-container-low p-stack_md rounded-xl border border-outline-variant/30 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary-fixed-dim/20 text-primary flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined"
                  data-icon="query_stats">
                  query_stats
                </span>
              </div>
              <div>
                <h4 className="text-label-md font-bold text-on-surface">
                  Culture Fit
                </h4>
                <p className="text-label-sm text-on-surface-variant mt-1">
                  Predictive alignment with team dynamics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNavbar />
    </>
  );
}
