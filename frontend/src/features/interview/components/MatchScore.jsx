import React from 'react';

export function MatchScore({ score = 70 }) {
  return (
    <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant p-stack_md lg:p-stack_lg rounded-xl">
      <h2 className="text-label-md lg:text-headline-sm font-label-md lg:font-headline-sm text-on-surface-variant lg:text-on-surface uppercase lg:normal-case tracking-wider lg:tracking-normal mb-stack_md">
        Match Score
      </h2>
      <div className="flex items-center lg:flex-col gap-stack_md lg:gap-stack_md">
        {/* Progress Circle */}
        <div className="radial-progress w-16 h-16 lg:w-40 lg:h-40 rounded-full border-4 border-primary-container lg:border-0 flex items-center justify-center relative">
          <div className="text-center">
            <span className="text-headline-sm lg:text-headline-lg-mobile font-bold lg:font-headline-md text-primary">
              {score}
            </span>
            <span className="hidden lg:inline text-label-md font-label-md text-secondary">
              /100
            </span>
          </div>
        </div>
        <div className="flex-1 lg:text-center">
          <p className="text-body-md font-semibold mb-1 text-primary lg:text-on-surface-variant">
            High Alignment
          </p>
          <p className="text-label-sm lg:text-body-md text-secondary lg:line-clamp-2">
            Strong technical foundation with minor specialized gaps.
          </p>
        </div>
      </div>
    </div>
  );
}
