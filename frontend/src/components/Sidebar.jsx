import { useInterview } from '@/features/interview';
import React from 'react';
import { Link, useLocation } from 'react-router';

export function Sidebar({ className }) {
  const { reports } = useInterview();
  const { pathname } = useLocation();

  return (
    <aside
      className={`${className} bg-surface-container-low/80 dark:bg-surface-dim/20 border-r border-outline-variant/30 backdrop-blur-md flex-col py-stack_lg gap-stack_md z-40 md:flex hidden`}>
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
          className={`flex items-center gap-3 px-3 py-2.5 ${!pathname.includes('reports') ? 'bg-secondary-container text-on-secondary-container border-l-4 border-primary font-semibold transition-transform duration-150 scale-[0.98]' : 'text-secondary hover:bg-surface-container-highest/50 transition-colors'}`}
          to="/">
          <span
            className="material-symbols-outlined"
            data-icon="add_box">
            add_box
          </span>
          <span className="text-label-md font-label-md">New Report</span>
        </Link>
        <Link
          className={`flex items-center gap-3 px-3 py-2.5 ${pathname.includes('reports') ? 'bg-secondary-container text-on-secondary-container border-l-4 border-primary font-semibold transition-transform duration-150 scale-[0.98]' : 'text-secondary hover:bg-surface-container-highest/50 transition-colors'}`}
          to="/reports">
          <span
            className="material-symbols-outlined"
            data-icon="analytics">
            analytics
          </span>
          <span className="text-label-md font-label-md">Reports</span>
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
              to={`/reports/${rep._id}`}>
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
      <div className="relative group px-4 mt-auto">
        <a className="text-secondary flex items-center px-3 py-2.5 hover:bg-surface-container-highest transition-all opacity-80 cursor-pointer">
          <span className="material-symbols-outlined mr-3">palette</span>
          <span className="font-label-md text-label-md">Theme</span>
          <span className="material-symbols-outlined ml-auto text-sm">
            chevron_right
          </span>
        </a>
        <div className="absolute left-full bottom-0 ml-2 w-32 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-1">
          <button className="w-full text-left px-4 py-2 text-label-md hover:bg-surface-container rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              light_mode
            </span>
            Light
          </button>
          <button className="w-full text-left px-4 py-2 text-label-md hover:bg-surface-container rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">dark_mode</span>
            Dark
          </button>
          <button className="w-full text-left px-4 py-2 text-label-md hover:bg-surface-container rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              desktop_windows
            </span>
            System
          </button>
        </div>
      </div>
    </aside>
  );
}
