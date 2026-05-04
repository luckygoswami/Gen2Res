import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import { RouterProvider } from 'react-router';
import { router } from '@/app.routes.jsx';
import { AuthContextProvider } from '@/features/auth/auth.context.jsx';

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router}>
      <StrictMode>
        <App />
      </StrictMode>
    </RouterProvider>
  </AuthContextProvider>,
);
