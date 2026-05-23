import React from 'react';

export function TopNavbar({ className }) {
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
      <div className="flex items-center gap-stack_md ml-gutter">
        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-label-md font-label-md text-on-surface">
              John Doe
            </p>
            <p className="text-label-sm font-label-sm text-outline">
              Web Developer
            </p>
          </div>
          <img
            alt="Recruiter Profile"
            className="w-10 h-10 rounded-full border-2 border-primary/20 group-hover:border-primary transition-all"
            data-alt="A professional headshot of a recruitment specialist with a friendly, confident expression. The person is dressed in modern business casual attire against a clean, softly blurred office background with cool blue and white tones. The lighting is bright and even, reinforcing a corporate yet approachable minimalist aesthetic."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV9xQ1vVZd9WwdInxWJUroHcljihev_gFng4rN3NbZD7o7G0xGK4QDPjdl0kYKh6V0BZPLOEYtBVaQRjm_uLU_X4P-BQw6hKbq8JxIlHRgRQQVzPzWeUbvznxlp4n5gYTpG0zZHAzirDEN2X8DstnucVGUtlJjGBS8ylp-TkSqDtCHaxqbs5Ce0lgXJTBP_BcO5mSWGsc6ATEMDr5Hk1Kjo3LtOWc-GjNM_K8lzEUtdEUg005447MMgcgj4E5xGeP_f6cwt7BwN0Ad"
          />
        </div>
      </div>
    </nav>
  );
}
