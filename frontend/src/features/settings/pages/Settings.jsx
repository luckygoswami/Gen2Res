import { useAuth } from '@/features/auth';
import React from 'react';
import packageJSON from '@/../package.json';

export function Settings() {
  const { handleLogout } = useAuth();

  return (
    <main className="overflow-auto p-margin_desktop max-w-7xl mx-auto w-full">
      <div className="max-w-md min-h-screen relative">
        {/* Page Title */}
        <div className="mb-stack_lg">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
            Settings
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Manage your account preferences and system configuration.
          </p>
        </div>
        {/* Settings List */}
        <div className="space-y-4">
          {/* Theme Row */}
          {/* <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl overflow-hidden shadow-sm border border-outline-variant/30">
            <button
              className="w-full flex items-center justify-between p-stack_md hover:bg-surface-container-low transition-colors group active:scale-[0.98] duration-150"
              onclick="toggleThemeModal()">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary-container text-on-secondary-container">
                  <span
                    className="material-symbols-outlined"
                    data-icon="palette">
                    palette
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-body-lg text-body-lg text-on-surface">
                    Theme
                  </p>
                  <p
                    className="font-label-md text-label-md text-on-surface-variant"
                    id="current-theme-label">
                    Light Mode
                  </p>
                </div>
              </div>
              <span
                className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform"
                data-icon="chevron_right">
                chevron_right
              </span>
            </button>
          </div> */}
          {/* Logout Row */}
          <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 mt-stack_lg">
            <button
              className="w-full flex items-center justify-between p-stack_md hover:bg-error-container/20 transition-colors group active:scale-[0.98] duration-150"
              onClick={handleLogout}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-error-container text-error">
                  <span
                    className="material-symbols-outlined"
                    data-icon="logout">
                    logout
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-body-lg text-body-lg text-error font-semibold">
                    Logout
                  </p>
                  <p className="font-label-md text-label-md text-on-surface-variant">
                    Sign out of your session
                  </p>
                </div>
              </div>
              <span
                className="material-symbols-outlined text-error opacity-0 group-hover:opacity-100 transition-opacity"
                data-icon="exit_to_app">
                exit_to_app
              </span>
            </button>
          </div>
        </div>

        {/* Decorative Visual: AI Pulse */}
        <div className="flex flex-col items-center justify-center opacity-40 grayscale bottom-0 absolute w-full">
          <p className="font-label-md text-label-md text-on-surface-variant">
            {`v${packageJSON.version}`}
          </p>
        </div>
      </div>
    </main>
  );
}
