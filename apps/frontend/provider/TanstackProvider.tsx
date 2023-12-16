'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function TanstackProvider({ children }: { children: React.ReactNode }) {
  const [client] = React.useState(new QueryClient());
  React.useEffect(() => {
    // Invalidate specific queries or all queries here
    client.invalidateQueries(); // You can pass a specific key or an array of keys to invalidate specific queries
  }, [client]);
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default TanstackProvider;
