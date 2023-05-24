import { Outlet } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Header />
      <main className='main'>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </main>
    </>
  );
}

export default App;
