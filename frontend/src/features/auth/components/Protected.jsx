import { useAuth } from '@/features/auth';
import { Navigate, Outlet } from 'react-router';

export function Protected() {
  const { loading, user } = useAuth();

  if (loading) return <main>Loading...</main>;

  if (!user) return <Navigate to={'/login'} />;

  return <Outlet />;
}
