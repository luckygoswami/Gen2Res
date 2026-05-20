import React from 'react';
import { Link } from 'react-router';

export function BottomNavbar() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest border-t border-outline-variant/30 flex justify-around items-center py-2 z-50 shadow-lg">
      <Link
        className="flex flex-col items-center gap-1 text-primary"
        to="/">
        <span
          className="material-symbols-outlined"
          data-icon="add_box">
          add_box
        </span>
        <span className="text-[10px] font-medium">New Report</span>
      </Link>
      {/* <Link
        className="flex flex-col items-center gap-1 text-secondary"
        to="#">
        <span
          className="material-symbols-outlined"
          data-icon="analytics">
          analytics
        </span>
        <span className="text-[10px] font-medium">Analytics</span>
      </Link> */}
      <Link
        className="flex flex-col items-center gap-1 text-secondary"
        to="#">
        <span
          className="material-symbols-outlined"
          data-icon="history">
          history
        </span>
        <span className="text-[10px] font-medium">History</span>
      </Link>
      <Link
        className="flex flex-col items-center gap-1 text-secondary"
        to="#">
        <span
          className="material-symbols-outlined"
          data-icon="settings">
          settings
        </span>
        <span className="text-[10px] font-medium">Settings</span>
      </Link>
    </nav>
  );
}
