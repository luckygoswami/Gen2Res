import React from 'react';
import {
  useInterview,
  Accordion,
  MatchScore,
  PreparationPlan,
  SkillGaps,
  TabbedLayout,
} from '@/features/interview';

export function Interview() {
  const { loading, report } = useInterview();

  if (loading || !report) return <main>Loading...</main>;

  return (
    <main className="p-4 lg:p-12 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-stack_md lg:space-y-stack_lg">
        {/* Breadcrumb & Header Section */}
        <div className="lg:flex lg:justify-between lg:items-end">
          <div className="space-y-2">
            {/* <nav className="flex items-center gap-2 text-label-md font-label-md text-secondary">
              <span className="hover:text-primary cursor-pointer">
                Dashboard
              </span>
              <span className="material-symbols-outlined text-[14px]">
                chevron_right
              </span>
              <span className="hover:text-primary cursor-pointer">Reports</span>
              <span className="material-symbols-outlined text-[14px]">
                chevron_right
              </span>
              <span className="text-on-surface">Alex Chen</span>
            </nav> */}
            <h1 className="font-display-lg text-headline-sm lg:text-display-lg text-on-surface">
              Interview Report:&nbsp;
              <span className="hidden lg:inline">{report.title}</span>
            </h1>
            <p className="lg:hidden text-body-md text-secondary">
              {report.title}
            </p>
          </div>
          <button className="w-full lg:w-auto mt-4 lg:mt-0 bg-primary lg:bg-primary text-white px-6 py-4 lg:py-3 rounded-lg lg:rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95">
            <span className="material-symbols-outlined">auto_awesome</span>
            Generate Resume
          </button>
        </div>
        {/* Summary Section: Score & Skill Gaps */}
        <div className="grid grid-cols-12 gap-stack_md lg:gap-gutter">
          {/* Match Score Card */}
          <MatchScore score={report.matchScore} />
          {/* Skill Gaps Card */}
          <SkillGaps skills={report.skillGaps} />
        </div>
        {/* Tabbed/Accordion Sections */}
        <TabbedLayout
          tabs={[
            {
              name: 'Technical Assessment',
              icon: 'code',
              element: <Accordion assessment={report.technicalQuestions} />,
            },
            {
              name: 'Behavioural Patterns',
              icon: 'groups',
              element: <Accordion assessment={report.behaviouralQuestions} />,
            },
            {
              name: 'Preparation Plan',
              icon: 'event_note',
              element: <PreparationPlan plan={report.preparationPlan} />,
            },
          ]}
        />
        {/* Intelligence Summary Section */}
        {/* <div className="bg-primary text-on-primary p-stack_md lg:p-stack_lg rounded-xl space-y-2 lg:space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">insights</span>
            <span className="text-label-md font-bold uppercase tracking-widest">
              AI Intelligence Summary
            </span>
          </div>
          <p className="text-body-md lg:text-body-lg">
            Alex represents the top 5% of candidates for this role based on
            technical proficiency and cultural fit. Recommendation: Proceed to
            final architectural review with focus on optimization strategies.
          </p>
        </div> */}
      </div>
    </main>
  );
}
