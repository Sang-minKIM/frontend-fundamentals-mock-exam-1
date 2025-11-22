import { GlobalPortal, GlobalStyles } from 'tosslib';
import { Routes } from './pages/Routes';

import { QueryClientProvider } from './providers/QueryClientProvider';

import { ErrorBoundary, Suspense } from '@suspensive/react';

export function App() {
  return (
    <>
      <GlobalStyles />
      <GlobalPortal.Provider>
        <ErrorBoundary fallback={<div>Error</div>}>
          <QueryClientProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes />
            </Suspense>
          </QueryClientProvider>
        </ErrorBoundary>
      </GlobalPortal.Provider>
    </>
  );
}
