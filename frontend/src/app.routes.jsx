import { createBrowserRouter } from 'react-router';
import { Login, Protected, Register } from '@/features/auth';
import { Home, Interview } from '@/features/interview';

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/',
    element: <Protected><Home /></Protected>,
  },
  {
    path: '/interview/:interviewId',
    element: <Protected><Interview /></Protected>
  }
]);
