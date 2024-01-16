import Login from 'auth/login/Login';
import Signup from 'auth/signup/Signup';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Signup />
    </QueryClientProvider>
  );
}

export default App;
