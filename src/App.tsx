import React, { Suspense } from 'react';
import { RouterProvider, useNavigate } from 'react-router-dom';
import router from './router';
import FallBack from './components/fallBack/fallBack';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <Suspense fallback={<FallBack />}>
      <SnackbarProvider maxSnack={5} autoHideDuration={3000}>
        <RouterProvider router={router} fallbackElement={<FallBack />} />
      </SnackbarProvider>
    </Suspense>
  );
}

export default App;
