import React from 'react';
import { BottomNavbar, Sidebar, TopNavbar } from '@/components';
import { Outlet } from 'react-router';

export function AppLayout() {
  return (
    <>
      <Sidebar />
      <TopNavbar />
      <Outlet />
      <BottomNavbar />
    </>
  );
}
