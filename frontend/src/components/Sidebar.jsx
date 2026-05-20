import { useInterview } from '@/features/interview';
import React from 'react';
import { Link } from 'react-router';

export function Sidebar() {
  const { reports } = useInterview();

  return (
    <aside className="fixed left-0 top-0 h-screen w-sidebar_width bg-surface-container-low/80 dark:bg-surface-dim/20 border-r border-outline-variant/30 backdrop-blur-md flex-col py-stack_lg gap-stack_md z-40 md:flex hidden">
      <div className="px-6 mb-stack_lg">
        <h1 className="text-headline-sm font-headline-sm font-semibold text-on-surface">
          Gen2Res AI
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        <div className="mb-4">
          <span className="px-2 text-label-sm font-label-sm text-outline uppercase tracking-wider">
            Reports
          </span>
        </div>
        {/* Active Navigation Item */}
        <Link
          className="flex items-center gap-3 px-3 py-2.5 bg-secondary-container text-on-secondary-container border-l-4 border-primary font-semibold transition-transform duration-150 scale-[0.98]"
          to="/">
          <span
            className="material-symbols-outlined"
            data-icon="add_box">
            add_box
          </span>
          <span className="text-label-md font-label-md">New Report</span>
        </Link>
        <div className="mt-8 mb-4">
          <span className="px-2 text-label-sm font-label-sm text-outline uppercase tracking-wider">
            Recent Reports
          </span>
        </div>
        <div className="space-y-1">
          {reports.slice(0, 3).map((rep) => (
            <Link
              key={rep._id}
              className="group flex flex-col gap-0.5 px-3 py-2 hover:bg-surface-container-highest/50 transition-colors rounded"
              to={`/interview/${rep._id}`}>
              <span className="text-label-md font-label-md text-on-surface truncate">
                {rep.title}
              </span>
              <span className="text-[10px] text-outline">
                {new Date(rep.createdAt).toDateString()}
              </span>
            </Link>
          ))}
        </div>
      </nav>
      <div className="px-4 mt-auto space-y-1">
        <Link
          className="flex items-center gap-3 px-3 py-2.5 text-secondary hover:bg-surface-container-highest/50 transition-colors"
          href="#">
          <span
            className="material-symbols-outlined"
            data-icon="history">
            history
          </span>
          <span className="text-label-md font-label-md">Previous Reports</span>
        </Link>
        <Link
          className="flex items-center gap-3 px-3 py-2.5 text-secondary hover:bg-surface-container-highest/50 transition-colors"
          href="#">
          <span
            className="material-symbols-outlined"
            data-icon="settings">
            settings
          </span>
          <span className="text-label-md font-label-md">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
