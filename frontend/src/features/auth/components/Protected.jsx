import { useAuth } from '@/features/auth';
import { Navigate } from 'react-router';

export function Protected({ children }) {
  const { loading, user } = useAuth();

  if (loading) return <main>Loading...</main>;

  if (!user) return <Navigate to={'/login'} />;

  return children;
}
