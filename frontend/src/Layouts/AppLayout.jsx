import React from 'react';
import { BottomNavbar, Sidebar, TopNavbar } from '@/components';
import { Outlet } from 'react-router';

export function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[4rem_auto_auto] md:grid-cols-[var(--spacing-sidebar_width)_1fr] md:grid-rows-[4rem_1fr]">
      <Sidebar className="row-span-2" />
      <TopNavbar />
      <Outlet />
      <BottomNavbar />
    </div>
  );
}
