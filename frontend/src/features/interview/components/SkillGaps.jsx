import React from 'react';

export function SkillGaps({ skills = [] }) {
  return (
    <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-stack_md lg:p-stack_lg rounded-xl">
      <div className="flex justify-between items-center mb-stack_md">
        <h2 className="text-label-md lg:text-headline-sm font-label-md lg:font-headline-sm text-on-surface-variant lg:text-on-surface uppercase lg:normal-case tracking-wider lg:tracking-normal flex items-center gap-1">
          Identified Skill Gaps
        </h2>
        <span className="hidden lg:inline text-label-md font-label-md text-secondary">
          {skills.length} Critical items
        </span>
      </div>
      {/* Mobile List / Desktop Table */}
      <div className="space-y-2 lg:hidden">
        {skills.map((sk, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-2 bg-surface-container-low rounded">
            <span className="text-body-md font-body-md">{sk.skill}</span>
            <span
              className={`px-2 py-0.5 ${
                sk.severity === 'low' ? 'text-secondary bg-surface-container'
                : sk.severity === 'medium' ?
                  'text-on-secondary-container bg-secondary-container'
                : 'text-on-error-container bg-error-container'
              } text-label-sm rounded-full`}>
              {sk.severity}
            </span>
          </div>
        ))}
      </div>
      <table className="hidden lg:table w-full text-left">
        <thead className="border-b border-outline-variant">
          <tr>
            <th className="pb-3 text-label-sm font-label-sm text-on-surface-variant uppercase">
              Skill
            </th>
            <th className="pb-3 text-label-sm font-label-sm text-on-surface-variant uppercase text-right">
              Severity
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/30">
          {skills.map((sk, i) => (
            <tr key={i}>
              <td className="py-3 font-semibold text-on-surface">{sk.skill}</td>
              <td className="py-3 text-right">
                <span
                  className={`${
                    sk.severity === 'low' ?
                      'text-secondary bg-surface-container'
                    : sk.severity === 'medium' ?
                      'text-on-secondary-container bg-secondary-container'
                    : 'text-on-error-container bg-error-container'
                  } px-3 py-1 rounded-full text-label-sm`}>
                  {sk.severity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
