"use client";
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface ProviderProps {
  children: ReactNode;
}

const Provider = ({children}: ProviderProps) => {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 6 * 1000,
        // refetchInterval: 6 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default Provider;