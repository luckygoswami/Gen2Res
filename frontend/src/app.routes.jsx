import { createBrowserRouter } from 'react-router';
import { Login, Register } from '@/features/auth';
import App from '@/App';

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]);
