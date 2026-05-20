import React from 'react';
import { Footer, Header } from '@/components';
import { Outlet } from 'react-router';

export function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
