import React from 'react';

export function Accordion({ assessment = [] }) {
  return (
    <div className="p-stack_md lg:p-0 max-w-4xl divide-outline-variant divide-y">
      {assessment.map((ass, i) => (
        <div
          className="group py-8"
          key={i}>
          <div className="flex gap-4">
            <div className="hidden lg:flex shrink-0 w-8 h-8 rounded-full bg-primary-fixed text-primary items-center justify-center font-bold">
              {i + 1}
            </div>
            <div className="space-y-2 lg:space-y-0 w-full">
              <div className="lg:hidden text-label-sm font-label-sm text-primary uppercase">
                Question
              </div>
              <h4 className="font-semibold text-on-surface mb-2">
                {ass.question}
              </h4>
              <div className="lg:hidden text-label-sm font-label-sm text-on-surface-variant uppercase mt-3">
                Candidate Response
              </div>
              <div className="bg-surface-container-low lg:bg-surface-container-low p-4 rounded-lg mb-3 border-l-4 lg:border-0 border-outline lg:border-none">
                <p className="hidden lg:block text-label-md font-label-md text-on-surface-variant mb-1 uppercase">
                  Candidate Response
                </p>
                <p className="text-body-md text-secondary italic">
                  {`"${ass.answer}"`}
                </p>
              </div>
              <div className="flex gap-2 items-start text-primary text-body-md bg-primary-fixed/30 lg:bg-transparent p-2 lg:p-0 rounded">
                <span className="material-symbols-outlined text-[18px] lg:text-[20px] mt-0.5">
                  psychology
                </span>
                <div>
                  <p className="lg:hidden text-label-sm font-bold text-on-primary-fixed-variant">
                    Interviewer Intuition
                  </p>
                  <p className="text-label-sm lg:text-body-md">
                    <strong className="hidden lg:inline font-semibold">
                      Interviewer Intuition:
                    </strong>
                    {ass.intention}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
