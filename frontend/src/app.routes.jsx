import { createBrowserRouter } from 'react-router';
import { Login, Protected, Register } from '@/features/auth';
import { Home, Interview, Reports } from '@/features/interview';
import { AppLayout, MainLayout } from '@/Layouts';
import { Settings } from '@/features/settings';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
  {
    element: <Protected />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/reports/:interviewId', element: <Interview /> },
          { path: '/reports', element: <Reports /> },
          { path: '/settings', element: <Settings /> },
        ],
      },
    ],
  },
]);
