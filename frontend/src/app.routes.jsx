import { createBrowserRouter } from 'react-router';
import { Login, Protected, Register } from '@/features/auth';
import App from '@/App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <App />
      </Protected>
    ),
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]);
