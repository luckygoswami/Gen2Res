import { createBrowserRouter } from 'react-router';
import { Login, Protected, Register } from '@/features/auth';
import App from '@/App';
import { Home } from '@/features/interview';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected><App /></Protected>, },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/interview',
    element: <Protected><Home /></Protected>,
  },
]);
