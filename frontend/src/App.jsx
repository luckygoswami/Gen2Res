import { AuthContextProvider } from '@/features/auth';
import { InterviewContextProvider } from '@/features/interview';
import { RouterProvider } from 'react-router';
import { router } from '@/app.routes';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthContextProvider>
        <InterviewContextProvider>
          <RouterProvider router={router} />
        </InterviewContextProvider>
      </AuthContextProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
