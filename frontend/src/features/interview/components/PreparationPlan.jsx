import React from 'react';

export function PreparationPlan({ plan = [] }) {
  return (
    <div className="p-stack_md lg:p-0 lg:py-8 space-y-stack_lg max-w-4xl">
      <div className="space-y-stack_md">
        <h3 className="text-headline-sm font-semibold text-on-surface mb-4">
          {plan.length}-Day Preparation Roadmap
        </h3>
        <div className="space-y-4 relative before:absolute before:left-4.75 before:top-4 before:bottom-4 before:w-0.5 before:bg-outline-variant">
          {plan.map((d, i) => (
            <div
              key={i}
              className="relative pl-12">
              <div className="absolute left-0 top-1 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white z-10 font-bold text-label-md">
                D{i + 1}
              </div>
              <div className="p-5 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm">
                <h5 className="text-body-lg font-bold text-on-surface mb-3">
                  Focus: {d.focus}
                </h5>
                <ul className="space-y-2">
                  {d.tasks.map((t, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 before:content-['•'] before:text-primary before:font-bold">
                      <span className="text-body-md text-on-surface-variant">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
