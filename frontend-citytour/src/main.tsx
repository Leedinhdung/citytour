import App from '@/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
