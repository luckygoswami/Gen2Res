import { useAuth } from '@/features/auth';
import React from 'react';

export function TopNavbar({ className }) {
  const { handleLogout } = useAuth();

  return (
    <nav
      className={`${className} bg-surface-container-lowest border-b border-outline-variant/30 flex justify-between items-center px-margin_mobile md:px-margin_desktop z-30`}>
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <span className="absolute inset-y-0 left-3 flex items-center text-outline group-focus-within:text-primary transition-colors">
            <span
              className="material-symbols-outlined"
              data-icon="search">
              search
            </span>
          </span>
          <input
            className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-body-md focus:ring-2 focus:ring-primary transition-all"
            placeholder="Search reports, candidates, or roles..."
            type="text"
          />
        </div>
      </div>

      <div className="relative group ml-5">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right">
            <p className="font-label-md text-label-md font-bold group-hover:text-primary transition-colors">
              John Doe
            </p>
            <p className="text-[10px] text-secondary">Web Developer</p>
          </div>
          <img
            alt="Recruiter profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-surface-container-highest"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV9xQ1vVZd9WwdInxWJUroHcljihev_gFng4rN3NbZD7o7G0xGK4QDPjdl0kYKh6V0BZPLOEYtBVaQRjm_uLU_X4P-BQw6hKbq8JxIlHRgRQQVzPzWeUbvznxlp4n5gYTpG0zZHAzirDEN2X8DstnucVGUtlJjGBS8ylp-TkSqDtCHaxqbs5Ce0lgXJTBP_BcO5mSWGsc6ATEMDr5Hk1Kjo3LtOWc-GjNM_K8lzEUtdEUg005447MMgcgj4E5xGeP_f6cwt7BwN0Ad"
          />
        </div>
        <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-outline-variant/30">
            <p className="font-label-md text-label-md font-bold text-on-surface">
              John Doe
            </p>
            <p className="text-[10px] text-secondary truncate">
              doe.john@gen2res.ai
            </p>
          </div>
          <div className="p-1">
            <button
              className="w-full flex items-center gap-3 px-3 py-2 text-label-md text-error hover:bg-error/5 rounded-lg transition-colors font-semibold"
              onClick={handleLogout}>
              <span className="material-symbols-outlined text-lg">
                exit_to_app
              </span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
