import { AuthContextProvider } from '@/features/auth';
import { InterviewContextProvider } from '@/features/interview';
import { RouterProvider } from 'react-router';
import { router } from '@/app.routes';

function App() {
  return (
    <AuthContextProvider>
      <InterviewContextProvider>
        <RouterProvider router={router} />
      </InterviewContextProvider>
    </AuthContextProvider>
  );
}

export default App;
