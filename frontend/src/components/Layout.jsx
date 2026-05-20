import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Outlet } from 'react-router';

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
