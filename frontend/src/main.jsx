import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import { RouterProvider } from 'react-router';
import { AuthContextProvider } from '@/features/auth';
import { router } from '@/app.routes';
import { InterviewContextProvider } from '@/features/interview';

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <InterviewContextProvider>
      <RouterProvider router={router}>
        <StrictMode>
          <App />
        </StrictMode>
      </RouterProvider>
    </InterviewContextProvider>
  </AuthContextProvider>,
);
